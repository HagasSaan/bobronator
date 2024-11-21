import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import GalleryScreen from "./components/screens/GalleryScreen";
import CameraScreen from "./components/screens/CameraScreen";
import PhotoScreen from "./components/screens/PhotoScreen";
import PhotoOptionsScreen from "./components/screens/PhotoOptionsScreen";
import React, { useReducer, useMemo, useEffect } from "react";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import SignOutScreen from "./components/screens/SignOutScreen";
import { Alert } from "react-native";

import { auth } from "./firebaseConfig";
import { authReducer, authInitialState } from "./components/reducers/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { AuthContext } from "./components/constants";

const Drawer = createDrawerNavigator();

export default function App() {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        try {
          console.log("Authorizing user");
          let result = await signInWithEmailAndPassword(
            auth,
            data.email,
            data.password,
          );
          dispatch({ type: "SIGN_IN", token: result._tokenResponse.idToken });
        } catch (error) {
          console.log("Error during signing in: ", error);
          Alert.alert("Error", error.toString());
        }
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        try {
          console.log("Registering user");
          let result = await createUserWithEmailAndPassword(
            auth,
            data.email,
            data.password,
          );
          Alert.alert("Success", "User registered");
          dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
        } catch (error) {
          console.log("Error during signing up: ", error);
          Alert.alert("Error", error.toString());
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >
          {state.userToken == null ? (
            <>
              <Drawer.Screen name="Login" component={LoginScreen} />
              <Drawer.Screen name="Register" component={RegisterScreen} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Gallery" component={GalleryScreen} />
              <Drawer.Screen name="Camera" component={CameraScreen} />
              <Drawer.Screen name="Sign Out" component={SignOutScreen} />
              <Drawer.Screen
                name="Photo"
                component={PhotoScreen}
                options={{
                  drawerItemStyle: { display: "none" },
                }}
              />
              <Drawer.Screen
                name="PhotoOptions"
                component={PhotoOptionsScreen}
                options={{
                  drawerItemStyle: { display: "none" },
                }}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
