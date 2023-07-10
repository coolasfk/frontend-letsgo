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
  Image,
  ScrollView,
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
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { SaveFormat } from "expo-image-manipulator";
import axios from "axios";
import EditName from "./editYourProfileComponents/EditName";
import { AntDesign } from "@expo/vector-icons";
import UserNameData from "./UserNameData";

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

    userName,
    setUserName,
    setUserAge,
    userAge,
    userSports,
    setUserSports,
    userCity,
    setUserCity,
    userLocationServer,
    setUserLocationServer,
    setBase64,
    base64,
    userImage,
    setUserImage,
  } = UseContextHook();
  const [textInputName, setTextInputName] = useState("");
  const [textInputAge, setTextInputAge] = useState(null);
  const [tempUserImage, setTempUserImage] = useState(userImage);
  let isPressed;

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
  };

  const handleUpdatedLocation = (newText) => {
    setLocation(newText);
  };

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],

        maxWidth: 300,
        maxHeight: 350,

        base64: true,
      });

      if (!result.canceled) {
        // setImage(result.assets[0].uri);
        console.log("i want to change my console log");

        // setImageHeight(Math.round(result.assets[0].height / 10));
        // setImageWidth(Math.round(result.assets[0].width / 10));
        console.log(
          "height & width",
          result.assets[0].height,
          result.assets[0].width
        );

        let height = result.assets[0].height;
        let width = result.assets[0].width;

        if (height > 3000) {
          height = Math.round(result.assets[0].height / 6);
          width = Math.round(result.assets[0].width / 6);
        } else if (height > 1500 && height < 3000) {
          height = Math.round(result.assets[0].height / 3);
          width = Math.round(result.assets[0].width / 3);
        } else if (height > 5000) {
          height = Math.round(result.assets[0].height / 8);
          width = Math.round(result.assets[0].width / 8);
        } else if (height < 900) {
          height = result.assets[0].height;
          width = result.assets[0].width;
        } else if (height >= 900 && height <= 1500) {
          height = Math.round(result.assets[0].height / 2);
          width = Math.round(result.assets[0].width / 2);
        }

        setActionButtonOpacity(1);
        compressImage(result.assets[0].uri, height, width);
      }
    } catch (e) {
      console.log("error image-upload", e);
    }
  };

  const compressImage = async (imageUri, imageHeight, imageWidth) => {
    console.log("imageHeight & Width", imageHeight, imageWidth);
    console.log("i am trying to downscale image");
    if (imageUri !== null) {
      try {
        console.log("lognr4");

        const manipResult = await ImageManipulator.manipulateAsync(
          imageUri,
          [
            {
              resize: {
                height: imageHeight,
                width: imageWidth,
              },
            },
          ],
          {
            compress: 1,
            format: SaveFormat.PNG,

            base64: true,
          }
        );

        console.log("manipresult", manipResult.uri, manipResult.base64);
        setBase64(manipResult.base64);
        setTempUserImage(manipResult.base64);
      } catch (e) {
        console.log("now what?", e);
      }
    }
  };

  const updateImage = async () => {
    console.log("base64", base64, "base64");
    try {
      const postUpdateImage = await axios.put(
        "https://lestgo--coolasfk.repl.co/users/updateImage/",
        { image: base64 }
      );
      if (postUpdateImage) {
        console.log(postUpdateImage.data.image, "postUpdateImage");

        setUserImage(postUpdateImage.data.image);
      }
    } catch (e) {
      console.log("error updateImage", e);
    }
  };

  ///// navigation

  const goBack = () => {
    navigation.navigate("FindBuddy");
  };

  const goToName = () => {
    navigation.navigate("EditName");
  };

  const goToAge = () => {
    navigation.navigate("EditAge");
  };

  return (
    <ScrollView>
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
              }}
            >
              <BackArrow onPress={goBack} />
            </View>
            <Text style={[Style.headline, { marginTop: 20 }]}>
              Edit your profile here.
            </Text>
            <View style={{ height: 500, weight: 400 }}>
              <Item
                name={userName}
                age={userAge}
                sports={userSports}
                image={userImage}
                goToName={goToName}
              />
            </View>
            <View style={design.centered}>
              <View
                style={{
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActionButton
                  onPress={goToName}
                  cta="update your name"
                ></ActionButton>
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
                  onPress={goToAge}
                  cta="update your age"
                ></ActionButton>
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
                    transform: [{ translateY: 113 }],
                    zIndex: -10,
                    position: "absolute",
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
                <ActionButton cta="update your location"></ActionButton>
              </View>
            </View>
            <View style={[design.centered, { marginTop: -17 }]}>
              <MaterialIcons
                name="highlight-remove"
                size={30}
                style={styles.removeIcon}
                onPress={pickImage}
              />
              <Image
                source={{ uri: `data:image/png;base64,${tempUserImage}` }}
                style={{
                  width: 300,
                  height: 350,
                  borderRadius: 5,
                  margin: 35,
                  borderWidth: 0.8,
                  borderColor: Color.color1,
                }}
              />
              <Text style={design.smallText}>
                Click on the icon in top right corner to update your pic.
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
                marginBottom: 30,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActionButton
                onPress={updateImage}
                cta="update your image"
              ></ActionButton>
            </View>
            <View
              style={{
                marginTop: 20,
                marginBottom: 30,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActionButton
                onPress={updateImage}
                cta="delete the account. bye."
              ></ActionButton>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
  removeIcon: {
    color: Color.myBgColor,
    position: "absolute",
    zIndex: 10,

    transform: [{ translateX: 125 }, { translateY: -158 }],
    textShadowRadius: 3,
    textShadowColor: "#969D95",
  },
  sport: {
    opacity: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.fontBodyColor,

    marginRight: 4,
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 20,
  },
  sportContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    color: Color.color1,
  },
  stars: {
    flexDirection: "row",
    marginLeft: 20,
  },
});

const Item = ({
  id,
  name,
  age,
  sports,
  image,
  location,
  colorStars1,
  colorStars2,
  colorStars3,
  colorStars4,
  colorStars5,
  colorStars6,
  title,
  yes,
  no,
  goToName,
}) => {
  return (
    <View style={styles.container}>
      <Image
        // source={{ uri: image }}
        source={{ uri: `data:image/png;base64,${image}` }}
        style={{
          width: 300,
          height: 300,
          borderRadius: 5,
          margin: 30,
          borderWidth: 0.8,
          borderColor: Color.color1,
        }}
      />

      <View>
        <Text
          onPress={goToName}
          style={[Style.headline, { marginTop: 0, marginBottom: 10 }]}
        >
          {name}, {age}
        </Text>

        <View style={styles.sportContainer}>
          <View style={styles.sport}>
            <Text style={styles.text}>{sports[0]}</Text>
            <View style={styles.stars}>
              <AntDesign
                name="star"
                margin={1}
                size={15}
                color={Color.color1}
              />
              <AntDesign
                name="star"
                margin={1}
                size={15}
                color={Color.color1}
              />
              <AntDesign
                name="star"
                margin={1}
                size={15}
                color={Color.color1}
              />
            </View>
          </View>
          <View style={[styles.sport, { marginBottom: 30 }]}>
            <Text style={styles.text}>{sports[1]}</Text>
            <View style={styles.stars}>
              <AntDesign
                name="star"
                margin={1}
                size={15}
                color={Color.color1}
              />
              <AntDesign
                name="star"
                margin={1}
                size={15}
                color={Color.color1}
              />
              <AntDesign
                name="star"
                margin={1}
                size={15}
                color={Color.color1}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default EditYourProfile;
