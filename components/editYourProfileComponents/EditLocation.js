import {
  View,
  TextInput,
  StyleSheet,
  Text,
  useWindowDimensions,
  Dimensions,
  Image,
} from "react-native";
import BackArrow from "../BackArrow";
import { UseContextHook } from "../../store/context/ContextProvider";
import Color from "../../style/Color";
import Style from "../../style/Style";
import ActionButton from "../ActionButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import React from "react";
import * as Location from "expo-location";

import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
import axios from "axios";

const EditLocation = ({ navigation }) => {
  const { width } = useWindowDimensions();
  let {
    setActionButtonOpacity,
    userData,
    setUserData,
    user,
    userLocationServer,
    setUserLocationServer,
    userCity,
    setUserCity,
  } = UseContextHook();

  const [tempLocation, setTempLocation] = useState("");
  const [typedLocation, setTypedLocation] = useState("");
  const [text, setText] = useState("New Spot?");
  const [isSuccessful, setIsSuccessful] = useState(false);

  // const [displayBtn, setDisplayBtn] = useState("none");
  // ("displayBtn", displayBtn);

  let updateLocation = async () => {
    ("fetching location started");
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      ("function works");
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    "lon, lat", location.coords.longitude, location.coords.latitude;
    let longitude = location.coords.longitude;
    let latitude = location.coords.latitude;
    let coordinates = [longitude, latitude];

    let address = await Location.reverseGeocodeAsync(location.coords);

    let newCity = address[0].city;
    setUserCity(newCity);
    "newCity", newCity;

    setTempLocation({
      type: "Point",
      coordinates: coordinates,
    });

    updateLocationServer();
  };

  const handleUpdatedLocation = (newText) => {
    setTypedLocation(newText);
    "typedLocation", typedLocation;
  };

  const updateLocationServer = async () => {
    "tempLocation", tempLocation;
    try {
      const updateLocation = await axios.put(
        "https://lestgo--coolasfk.repl.co/users/updateLocation/",
        { location: tempLocation }
      );
      if (updateLocation) {
        setUserLocationServer(updateLocation.data.location);
        setUserCity(updateLocation.data.city);
        setIsSuccessful(true);
        setText(
          `Welcome to ${updateLocation.data.city}! Your location was successfully updated`
        );
        setTimeout(() => {
          setIsSuccessful(false);
          setText("New Spot?");
        }, 5000);
      } else {
        ("it did not work out");
      }
    } catch (e) {
      "error updating location", e;
    }
  };

  const goBack = () => {
    navigation.navigate("EditYourProfile");
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Color.myBgColor }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View
          style={{
            width: width,
            alignItems: "left",
            marginLeft: 40,
          }}
        >
          <BackArrow onPress={goBack} />
        </View>
        <Text style={[Style.headline, { marginTop: 20 }]}>{text}</Text>

        <View style={[design.inputContainer, { marginTop: 25 }]}>
          <TextInput
            autoCorrect={false}
            maxLength={25}
            onChangeText={handleUpdatedLocation}
            style={design.textInput}
            placeholder={text}
          ></TextInput>
        </View>
        <Pressable
          onPress={updateLocation}
          style={({ pressed }) => [pressed && design.pressed, { opacity: 1 }]}
        >
          <View style={design.inputContainer}>
            <Text style={[design.textInput]}>or share your location</Text>
          </View>
        </Pressable>

        <View
          style={[
            design.buttonUpdateLocation,
            isSuccessful
              ? {
                  backgroundColor: "green",
                  transform: [{ translateY: 236 }],
                  zIndex: -10,
                  position: "absolute",
                  display: "none",
                }
              : {
                  backgroundColor: "green",
                  transform: [{ translateY: 236 }],
                  zIndex: -10,
                  position: "absolute",
                  display: "flex",
                },
          ]}
        >
          <Text
            style={[
              design.textInput,
              {
                backgroundColor: "green",
              },
            ]}
          >
            or share your location
          </Text>
        </View>

        <View
          style={{
            // marginTop: 20,
            // marginBottom: 30,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActionButton
            onPress={updateLocationServer}
            cta="update your location"
          ></ActionButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
    paddingTop: 50,
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
  removeIcon: {
    color: Color.myBgColor,
    position: "absolute",
    zIndex: 10,

    transform: [{ translateX: 125 }, { translateY: -158 }],
    textShadowRadius: 3,
    textShadowColor: "#969D95",
  },
});

export default EditLocation;
