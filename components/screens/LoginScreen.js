import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AuthContext } from "../constants";
import { styles } from "../styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const insets = useSafeAreaInsets();

  const { signIn } = React.useContext(AuthContext);

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
      <Text style={styles.text}>Bobronator - Sign In</Text>
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
        style={styles.button}
        onPress={() => signIn({ email, password })}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
