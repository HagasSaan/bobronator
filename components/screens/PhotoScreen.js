import React from "react";
import { Image, Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PhotoScreen({ route }) {
  const { width, height } = Dimensions.get("window");
  const insets = useSafeAreaInsets();

  const { image } = route.params;
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
          height: height,
          uri: image.uri,
        }}
      />
    </View>
  );
}
