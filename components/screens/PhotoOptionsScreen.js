import React, { useState, useCallback } from "react";
import {
  Text,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as SQLite from "expo-sqlite";
import { dbName } from "../constants";
import { styles } from "../styles";

export default function PhotoOptionsScreen({ navigation, route }) {
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();
  const [description, setDescription] = useState("");
  const db = SQLite.openDatabaseSync(dbName);

  const { image } = route.params;

  useFocusEffect(
    useCallback(() => {
      async function getPhotoInfoFromDB() {
        console.log("opened photo options screen", image.filename);
        const row = await db.getFirstAsync(
          "SELECT * FROM photos WHERE filename=?",
          image.filename,
        );
        if (row == null) {
          console.log("something wrong!");
          return;
        }
        console.log(image, row);
        setDescription(row.description);
      }
      getPhotoInfoFromDB();
      return () => {};
    }, [image]),
  );

  async function updateImageDescription() {
    await db.runAsync(
      "UPDATE photos SET description=? WHERE filename=?",
      description,
      image.filename,
    );
    console.log("updated description in DB");
  }

  async function deleteImage() {
    try {
      await MediaLibrary.deleteAssetsAsync(image);
      console.log("deleted asset");
    } catch (error) {
      Alert.alert("Error", error.toString());
      return;
    }
    try {
      await db.runAsync("DELETE FROM photos WHERE filename=?", image.filename);
      console.log("deleted db info for image");
    } catch (error) {
      Alert.alert("Error", error.toString());
    }
    navigation.goBack();
  }

  async function sendImageByEmail() {
    console.log("send image by email", image);
    const canSendEmail = await MailComposer.isAvailableAsync();
    if (!canSendEmail) {
      Alert.alert("Error", "Email sending not available");
      return;
    }

    let permanentLocation = FileSystem.documentDirectory + image.filename;
    await FileSystem.copyAsync({
      from: image.uri,
      to: permanentLocation,
    });

    await MailComposer.composeAsync({
      subject: "Bobronator Image",
      body: description,
      isHtml: false,
      attachments: [permanentLocation],
    });

    Alert.alert("Success", "Email sent!");
  }

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <Image
        source={{
          width: width,
          height: height / 2,
          uri: image.uri,
        }}
      />

      <TextInput
        editable
        multiline
        style={styles.input}
        onChangeText={setDescription}
        placeholder="Add your photo description here"
        numberOfLines={4}
        value={description}
      />
      <TouchableOpacity style={styles.button} onPress={updateImageDescription}>
        <Text style={styles.buttonText}>Update image description</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deleteImage}>
        <Text style={styles.buttonText}>Delete image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={sendImageByEmail}>
        <Text style={styles.buttonText}>Send By EMail</Text>
      </TouchableOpacity>
    </View>
  );
}
