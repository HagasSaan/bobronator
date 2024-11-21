import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { padding: 10 },
  image: { margin: 2 },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    width: "100%",
  },

  button: {
    backgroundColor: "black",
    width: "100%",
    height: "5%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    margin: 2,
  },
  buttonText: { color: "white", fontSize: 18 },
  camera: {
    flex: 1,
  },
});
