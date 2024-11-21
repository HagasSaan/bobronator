import React from "react";
import { Dimensions, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

export default function PhotoGrid({ photos, numColumns, numRows }) {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const widthSize = width / numColumns - 4;
  const heightSize = height / numRows - 4;

  return (
    <FlatList
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      renderItem={({ item }) => (
        <TouchableOpacity
          onLongPress={() => {
            navigation.navigate("PhotoOptions", { image: item });
          }}
          onPress={() => {
            navigation.navigate("Photo", { image: item });
          }}
        >
          <Image
            source={{
              width: widthSize,
              height: heightSize,
              uri: item.uri,
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      )}
    />
  );
}
