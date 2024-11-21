import * as React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AuthContext } from "../constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "../styles";

export default function SignOutScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = React.useContext(AuthContext);

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#fff",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Are you sure you want to sign out?</Text>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
