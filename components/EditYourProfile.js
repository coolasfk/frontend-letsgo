import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Text,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import BackArrow from "./BackArrow";
import { UseContextHook } from "../store/context/ContextProvider";
import Color from "../style/Color";
import Style from "../style/Style";
import ActionButton from "./ActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import React from "react";
const windowWidth = Dimensions.get("window").width;
import * as Location from "expo-location";
import { Pressable } from "react-native";

const EditYourProfile = ({ navigation }) => {
  let { width } = useWindowDimensions();
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
    user,
    setUser,
    location,
  } = UseContextHook();
  const [textInputName, setTextInputName] = useState("");
  const [textInputAge, setTextInputAge] = useState(null);

  ///i removed React.useState(false)

  const goBack = () => {
    navigation.navigate("FindBuddy");
  };

  let updateLocation = async () => {
    console.log("fetching location started");
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
  const handleUpdatedLocation = (newText) => {
    setLocation(newText);
  };

  //   "https://lestgo--coolasfk.repl.co/users/:email1/",
  const goToFindBuddy = () => {
    navigation.navigate("FindBuddy");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{
              width: width,
              alignItems: "left",
              marginLeft: 40,
              // marginTop: 4,
            }}
          >
            <BackArrow onPress={goBack} />
          </View>
          <Text style={[Style.headline, { marginTop: 20 }]}>
            Edit your profile here.
          </Text>
          <Text style={[design.smallText, { marginTop: 20 }]}>
            Your current spot: {user.city}
          </Text>
          <View style={design.centered}>
            <View style={design.inputContainer}>
              <TextInput
                autoCorrect={false}
                maxLength={25}
                onChangeText={handleTextInput}
                style={design.textInput}
                placeholder={user.name}
              ></TextInput>
            </View>
            <View style={design.inputContainer}>
              <TextInput
                keyboardType="numeric"
                maxLength={2}
                onChangeText={handleAgeInput}
                style={design.textInput}
                placeholder={user.age.toString()}
              ></TextInput>
            </View>
            <View style={design.inputContainer}>
              <TextInput
                autoCorrect={false}
                maxLength={25}
                onChangeText={handleUpdatedLocation}
                style={design.textInput}
                placeholder="type in your desired location"
              ></TextInput>
            </View>
            <Pressable
              onPress={updateLocation}
              style={({ pressed }) => [
                pressed && design.pressed,
                { opacity: 1 },
              ]}
            >
              <View onPress={updateLocation} style={design.inputContainer}>
                <Text style={[design.textInput]}>or share your location</Text>
              </View>
            </Pressable>
            <View
              style={[
                design.buttonUpdateLocation,
                {
                  backgroundColor: "green",
                  transform: [{ translateY: 112 }],
                  zIndex: -10,
                  position: "absolute",
                },
              ]}
            >
              <Text
                style={[
                  design.textInput,
                  {
                    // position: "absolute",
                    backgroundColor: "green",
                    // marginTop: 20,
                    // zIndex: -10,
                  },
                ]}
              >
                or share your location
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActionButton cta="submit"></ActionButton>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const Design = StyleSheet.create({
  form: {
    marginTop: 100,
    color: Color.fontBodyColor,
  },
});
const design = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    margin: 10,
    backgroundColor: Color.color3,

    borderRadius: 45,
    padding: 15,
    maxWidth: 500,
  },
  buttonUpdateLocation: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    margin: 10,
    backgroundColor: Color.color3,

    borderRadius: 45,
    padding: 15,
    maxWidth: 500,
  },
  textInput: {
    color: Color.color2,
    textAlign: "center",
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,

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
  pressed: {
    opacity: 0.7,
    transform: "translateY(2px)",
  },
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "top",
    height: "100%",
    width: windowWidth,
    backgroundColor: "#C7D8C5",
    paddingTop: 25,
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

export default EditYourProfile;
