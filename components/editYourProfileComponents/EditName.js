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

import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
import axios from "axios";
const EditName = ({ navigation }) => {
  const { width } = useWindowDimensions();
  let {
    setActionButtonOpacity,
    userData,
    setUserData,
    user,
    setUser,
    setBase64,
    base64,
    userImage,
    setUserImage,
    userName,
    setUserName,
  } = UseContextHook();

  const [tempName, setTempName] = useState("");
  const [text, setText] = useState("Fancy New Username?");

  //   let isPressed;
  //   const namePressed = () => {};

  const handleTextInput = (newText) => {
    setTempName(newText);
  };

  const goBack = () => {
    navigation.navigate("EditYourProfile");
  };

  const updateNameServer = async () => {
    try {
      let updatedName = await axios.put(
        "https://lestgo--coolasfk.repl.co/users/updateName/",
        { name: tempName }
      );
      if (updatedName) {
        setUserName(tempName);
        user.name = tempName;
        setText(`Yeah, ${tempName}. Your name was successfully updated!`);
        setTimeout(() => {
          setText("Fancy New Username?");
        }, 6000);
      }
    } catch (e) {
      ("error putting name on the server", e);
    }
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

        <View style={design.centered}>
          <View style={design.inputContainer}>
            <TextInput
              autoCorrect={false}
              maxLength={25}
              onChangeText={handleTextInput}
              //   onPress={namePressed}
              style={design.textInput}
              placeholder={userName}
            ></TextInput>
          </View>
          <Pressable
            style={({ pressed }) => [pressed && design.pressed, { opacity: 1 }]}
          >
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
                onPress={updateNameServer}
                cta="update your name"
              ></ActionButton>
            </View>
          </Pressable>
          <View style={{ marginTop: 90 }}>
            <Image source={require("../../assets/skateboarderSeaLines.png")} />
          </View>
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

export default EditName;
