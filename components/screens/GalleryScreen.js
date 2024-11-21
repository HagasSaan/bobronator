import { useCallback, useReducer } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  photoActionCreators,
  photoInitialState,
  photoReducer,
} from "../reducers/photos";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PhotoGrid from "../PhotoGrid";
import * as MediaLibrary from "expo-media-library";
import albumName from "../constants";
import { styles } from "../styles";

export default function GalleryScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [state, dispatch] = useReducer(photoReducer, photoInitialState);
  const { photos, loading, error } = state;

  async function getPhotos() {
    const album = await MediaLibrary.getAlbumAsync(albumName);
    if (album != null) {
      const { assets } = await MediaLibrary.getAssetsAsync({ album });
      return assets;
    }
    throw "Album not found!";
  }

  const fetchPhotos = useCallback(async () => {
    dispatch(photoActionCreators.loading());

    try {
      const photos = await getPhotos();
      dispatch(photoActionCreators.success(photos));
    } catch (e) {
      console.log("error during fetching photos:", e);
      dispatch(photoActionCreators.failure(e));
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPhotos();
      return () => {};
    }, []),
  );

  if (photos.length === 0) {
    if (loading) {
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
          <ActivityIndicator animating={true} />
        </View>
      );
    }

    if (error) {
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
          <Text style={styles.text}>
            Failed to load photos, reason: {error.toString()}
          </Text>
        </View>
      );
    }
  }

  return (
    <View
      onLayout={fetchPhotos}
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      <PhotoGrid numColumns={3} numRows={4} photos={photos} />
    </View>
  );
}
