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
import { Entypo } from "@expo/vector-icons";
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
    setEmail,
    setPassword,
    bio,
    setBio,
  } = UseContextHook();

  let deleteUser = async () => {
    try {
      const deleteUser = await axios.delete(
        `https://lestgo--coolasfk.repl.co/users`
      );
      if (deleteUser) {
        navigation.navigate("WelcomeScreen");
      }
    } catch (e) {
      "error deleting user", e;
    }
  };

  ///// navigation

  const goBack = () => {
    navigation.navigate("AfterLoginPage");
  };

  const goToName = () => {
    navigation.navigate("EditName");
  };

  const goToAge = () => {
    navigation.navigate("EditAge");
  };

  const goToLocation = () => {
    navigation.navigate("EditLocation");
  };

  const goToSports = () => {
    navigation.navigate("EditSports");
  };

  const goToImage = () => {
    navigation.navigate("EditImage");
  };

  const goToBio = () => {
    navigation.navigate("EditBio");
  };

  const logOut = () => {
    setEmail("");
    setPassword("");
    navigation.navigate("WelcomeScreen");
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
              Edit your profile here
            </Text>
            <View style={{ height: 610, weight: 400, marginTop: 0 }}>
              <Item
                name={userName}
                age={userAge}
                sports={userSports}
                image={userImage}
                goToName={goToName}
                goToSports={goToSports}
                goToImage={goToImage}
                goToAge={goToAge}
                userCity={userCity}
                goToBio={goToBio}
              />
            </View>
            <View>
              <View style={[styles.thinRectangle, { marginTop: 40 }]}></View>
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
                  marginTop: -40,
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

              <View
                style={{
                  marginTop: -40,
                  // marginBottom: 30,
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActionButton
                  onPress={goToSports}
                  cta="update your sports"
                ></ActionButton>
              </View>
              <View
                style={{
                  marginTop: -40,
                  // marginBottom: 30,
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActionButton
                  onPress={goToImage}
                  cta="update your image"
                ></ActionButton>
              </View>
              <View
                style={{
                  marginTop: -40,
                  // marginBottom: 30,
                  padding: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActionButton
                  onPress={goToLocation}
                  cta="update your location"
                ></ActionButton>
              </View>
            </View>

            <View
              style={{
                marginTop: -40,

                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActionButton
                onPress={goToBio}
                cta="update your bio"
              ></ActionButton>
            </View>
            <View>
              <View style={[styles.thinRectangle, { marginTop: 0 }]}></View>
            </View>
            <View
              style={{
                marginTop: 10,

                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActionButton onPress={logOut} cta="log out"></ActionButton>
            </View>

            <View
              style={{
                marginTop: -40,
                marginBottom: 30,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActionButton
                onPress={deleteUser}
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
    marginTop: 10,
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
  thinRectangle: {
    height: 3,
    width: 340,
    backgroundColor: Color.fontBodyColor,
    backgroundColor: Color.color1,
    borderRadius: 50,
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
  goToImage,
  goToSports,
  goToAge,
  goToBio,
  userCity,
}) => {
  return (
    <View style={styles.container}>
      <View onPress={goToImage}>
        <View
          style={{
            zIndex: 10,
            position: "absolute",
            marginTop: 200,
            marginLeft: 160,
          }}
        >
          <MaterialIcons
            name="highlight-remove"
            size={30}
            style={styles.removeIcon}
            onPress={goToImage}
          />
        </View>
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
      </View>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            onPress={goToName}
            style={[
              Style.headline,
              {
                marginTop: 0,
                marginBottom: 10,
                marginLeft: 0,
                marginRight: 10,
              },
            ]}
          >
            {name},
          </Text>
          <Text
            onPress={goToAge}
            style={[
              Style.headline,
              { marginTop: 0, marginBottom: 10, marginLeft: 0, marginRight: 0 },
            ]}
          >
            {age}
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",

            alignItems: "center",
            marginBottom: 20,
            marginTop: 10,
          }}
        >
          <Text onPress={goToBio} style={styles.smallText}>
            Hey I'm Klem and I'm looking for new friends.
          </Text>
        </View>
        <View onPress={goToSports} style={styles.sportContainer}>
          <View style={styles.sport}>
            <Text onPress={goToSports} style={styles.text}>
              {sports[0]}
            </Text>
            {/* <View style={styles.stars}>
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
            </View> */}
          </View>
          <View
            onPress={goToSports}
            style={[styles.sport, { marginBottom: 30 }]}
          >
            <Text onPress={goToSports} style={styles.text}>
              {sports[1]}
            </Text>
            {/* <View style={styles.stars}>
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
            </View> */}
          </View>
          <View
            style={{
              justifyContent: "center",

              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Entypo
              name="location-pin"
              size={24}
              color={Color.color2}
              marginRight={3}
              marginBottom={7}
            />
            <Text style={styles.smallText}>{userCity}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default EditYourProfile;
