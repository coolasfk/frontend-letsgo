import React, { useState, useEffect, createContext, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContextProvider from "./store/context/ContextProvider";

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
import AfterLoginPage from "./components/AfterLoginPage";
import OldFriends from "./components/MyFriends";
import EditYourProfile from "./components/EditYourProfile";
import LoginPage from "./components/LoginPage";
import EditName from "./components/editYourProfileComponents/EditName";
import EditAge from "./components/editYourProfileComponents/EditAge";
import EditLocation from "./components/editYourProfileComponents/EditLocation";
import EditSports from "./components/editYourProfileComponents/EditSports";
import EditImage from "./components/editYourProfileComponents/EditImage";
import EditBio from "./components/editYourProfileComponents/EditBio";
import ResetPassPage from "./components/ResetPassPage";
import SendEmailToResetPassword from "./components/SendEmailToResetPassword";
import Chat from "./components/Chat";
import MyFriends from "./components/MyFriends";
import DeleteFriend from "./components/DeleteFriend";

const App = () => {
  let [fontsLoaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  ("is mu console working");

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
            name="AfterLoginPage"
            component={AfterLoginPage}
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
          <Stack.Screen
            name="EditName"
            component={EditName}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditAge"
            component={EditAge}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditLocation"
            component={EditLocation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditSports"
            component={EditSports}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditImage"
            component={EditImage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditBio"
            component={EditBio}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassPage"
            component={ResetPassPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SendEmailToResetPassword"
            component={SendEmailToResetPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MyFriends"
            component={MyFriends}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DeleteFriend"
            component={DeleteFriend}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;
