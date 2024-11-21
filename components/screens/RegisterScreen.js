import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AuthContext } from "../constants";
import { styles } from "../styles";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const insets = useSafeAreaInsets();

  const { signUp } = React.useContext(AuthContext);

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
      <Text style={styles.text}>Bobronator - Sign Up</Text>
      <TextInput
        onChangeText={(value) => setEmail(value)}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="email"
        value={email}
        style={styles.input}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
        placeholder="password"
        value={password}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={() => {
          signUp({ email, password });
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
