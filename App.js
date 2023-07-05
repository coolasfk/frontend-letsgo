import React, { useState, useEffect, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContextProvider from "../fr/store/context/ContextProvider";

// import AppLoading from "expo-app-loading";
// import SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";
const Stack = createNativeStackNavigator();
import WelcomeScreen from "./components/WelcomeScreen";
import RegisterSignUp from "./components/RegisterSignUp";
import FindBuddy from "./components/FindBuddy";
import OldFriends from "./components/MyFriends";
import EditYourProfile from "./components/EditYourProfile";
import LoginPage from "./components/LoginPage";

const App = () => {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  console.log("is mu console working");

  if (!fontsLoaded) {
    return null;
    // return <SplashScreen />;
  }

  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="RegisterSignUp"
            component={RegisterSignUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FindBuddy"
            component={FindBuddy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OldFriends"
            component={OldFriends}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditYourProfile"
            component={EditYourProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;
