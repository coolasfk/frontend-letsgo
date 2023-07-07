import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Text,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import React from "react";
import { Switch } from "react-native-paper";
import Color from "../style/Color";
import { UseContextHook } from "../store/context/ContextProvider";
import * as Location from "expo-location";


const UserNameData = ({ cta }) => {
  let {
    setActionButtonOpacity,
    userData,
    setUserData,
    userLocation,
    setLocation,
    setUserLocation,
    setCity,
    email,
    setEmail,
    password,
    setPassword,
  } = UseContextHook();
  const [textInputName, setTextInputName] = useState("");
  const [textInputAge, setTextInputAge] = useState(null);

  const [displayEmail, setDisplayEmail] = useState("none");
  ///------> ADD A FUNC TO NOT ALLOW REGISTER THE SAME EMAIL TWICE
  let nameColor = Color.color2;
  let ageColor = "red";
  let emailColor = "green";
  let displayName = "none";
  let displayAge = "none";

  let displayPassword = "none";

  const [isSwitchOn, setIsSwitchOn] = useState(false);

  ///i removed React.useState(false)

  const onToggleSwitch = () => {
    letsgo();
    letsgo();
    setIsSwitchOn(!isSwitchOn);
    console.log("isSwitchOn", isSwitchOn);
  };

  let letsgo = async () => {
    console.log("Toggle switch");
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("function works");
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);

    console.log(
      "lon, lat",
      location.coords.longitude,
      location.coords.latitude
    );
    let longitude = location.coords.longitude;
    let latitude = location.coords.latitude;
    let coordinates = [longitude, latitude];

    let address = await Location.reverseGeocodeAsync(location.coords);

    let newCity = address[0].city;
    setCity(newCity);
    console.log("newCity", newCity);
    setUserData({ ...userData, city: newCity });
    setUserLocation({
      type: "Point",
      coordinates: coordinates,
    });

    console.log("------userLocation", userLocation);
    /// WHY do I need to click twice so the userLoaction is shown

    // fetch("https://lestgo--coolasfk.repl.co/users", {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(userLocation),
    // }).catch((error) => {
    //   console.error("error:", error);
    // });
  };
  const handleTextInput = (newText) => {
    setUserData({ ...userData, name: newText });
    setTextInputName(newText);
    // console.log("------userData name", userData);
  };
  const handleAgeInput = (newText) => {
    setUserData({ ...userData, age: +newText });
    setTextInputAge(newText);
    // console.log("------userData age", userData);
  };

  const handlePassword = (newText) => {
    setUserData({ ...userData, password: newText });
    setPassword(newText);
    // console.log("------userData pass", userData);
  };
  const handleEmail = (newText) => {
    setUserData({ ...userData, email1: newText });
    setEmail(newText);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // console.log("------userData email", userData);
    if (emailPattern.test(email)) {
      setDisplayEmail("flex");

      //   Alert.alert("Valid Email", "The email address is valid.");
    } else {
      setDisplayEmail("none");
    }
  };

  if (textInputName.length > 1) {
    nameColor = "green";
    displayName = "flex";
  }
  if (textInputAge >= 18) {
    ageColor = "green";
    displayAge = "flex";
  }
  if (password.length >= 3) {
    displayPassword = "flex";
  }

  useEffect(() => {
    if (
      displayAge === "flex" &&
      displayName === "flex" &&
      displayEmail === "flex" &&
      displayPassword === "flex" &&
      isSwitchOn === true
    ) {
      setActionButtonOpacity(1);

      console.log("ok");
    } else {
      setActionButtonOpacity(0.3);
    }
  }, [displayEmail, displayName, displayAge, displayPassword, isSwitchOn]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={design.centered}>
          <View style={design.inputContainer}>
            <TextInput
              autoCorrect={false}
              maxLength={25}
              onChangeText={handleTextInput}
              style={design.textInput}
              placeholder="type in your name"
            ></TextInput>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color={nameColor}
              display={displayName}
            />
          </View>
          <View
            style={[
              design.inputContainer,
              // {
              //   backgroundColor: Color.myBgColor,
              //   borderColor: Color.fontBodyColor,
              //   borderWidth: 2,
              // },
            ]}
          >
            <Text style={[design.textInput]}>share my location</Text>
            <Switch
              color={Color.fontBodyColor}
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
            />
          </View>
          <View style={design.inputContainer}>
            <TextInput
              keyboardType="numeric"
              maxLength={2}
              onChangeText={handleAgeInput}
              style={design.textInput}
              placeholder="type in your age"
            ></TextInput>

            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color={ageColor}
              display={displayAge}
            />
          </View>
          <View style={design.inputContainer}>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              maxLength={40}
              onChangeText={handleEmail}
              style={design.textInput}
              placeholder="type in your email"
            ></TextInput>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color={emailColor}
              display={displayEmail}
            />
          </View>
          <View style={design.inputContainer}>
            <TextInput
              autoCorrect={false}
              autoCapitalize="none"
              maxLength={25}
              onChangeText={handlePassword}
              style={design.textInput}
              placeholder="type in your password"
            ></TextInput>
            <Ionicons
              name="checkmark-circle-outline"
              size={30}
              color="green"
              display={displayPassword}
            />
          </View>
        
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const design = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    // justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    margin: 10,
    backgroundColor: Color.color3,

    borderRadius: 45,
    padding: 15,
  },
  textInput: {
    color: Color.color2,
    textAlign: "center",
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    // fontSize: 22,
    maxWidth: 300,
    backgroundColor: Color.color3,

    marginRight: 10,

    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    marginLeft: 100,
  },
  smallText: {
    color: Color.color2,
    textAlign: "center",
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    maxWidth: 300,
  },
  centered: {
    overflow: "visible",
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },

  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});

export default UserNameData;
