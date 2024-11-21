import { CameraView, useCameraPermissions } from "expo-camera";
import { useState, useContext } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as SQLite from "expo-sqlite";
import albumName, { dbName } from "../constants";

export default function CameraScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const db = SQLite.openDatabaseSync(dbName);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    const { uri } = await camera.takePictureAsync();
    const asset = await MediaLibrary.createAssetAsync(uri);
    const album = await MediaLibrary.getAlbumAsync(albumName);
    if (album == null) {
      await MediaLibrary.createAlbumAsync(albumName, asset);
    } else {
      await MediaLibrary.addAssetsToAlbumAsync([asset], album);
    }

    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS photos (
          id INTEGER PRIMARY KEY NOT NULL,
          filename TEXT NOT NULL,
          description TEXT NOT NULL
        );
      `);
      console.log("db created (or it just exists)");
    } catch (error) {
      console.log("Error during creation DB: ", error);
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO photos (filename, description) VALUES (?, ?)",
        asset.filename,
        "",
      );
      console.log("image info inserted");
    } catch (error) {
      console.log("Error during inserting asset to DB: ", error);
      return;
    }
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={(r) => {
          setCamera(r);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
