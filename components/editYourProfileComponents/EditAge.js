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

const EditAge = ({ navigation }) => {
  const { width } = useWindowDimensions();
  let {
    setActionButtonOpacity,
    userData,
    setUserData,
    setUserAge,
    userAge,
    user,
  } = UseContextHook();

  const [textInputName, setTextInputName] = useState("");

  let isPressed;
  const namePressed = () => {};

  const handleAgeInput = (newText) => {
    console.log("newText", newText);
    setUserAge(newText);
  };

  const goBack = () => {
    navigation.navigate("EditYourProfile");
  };

  const updateAge = async () => {
    try {
      const sendUpdateAge = await axios.put(
        "https://lestgo--coolasfk.repl.co/users/updateAge/",
        { age: userAge }
      );
    } catch (e) {
      console.log("error updating age", e);
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
        <Text style={[Style.headline, { marginTop: 20 }]}>
          Did you have {"\n"} a birthday recently?
        </Text>

        <View style={design.centered}>
          <View style={design.inputContainer}>
            <TextInput
              keyboardType="numeric"
              maxLength={2}
              onChangeText={handleAgeInput}
              style={design.textInput}
              placeholder={user.age.toString()}
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
                onPress={updateAge}
                cta="update your age"
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
});

export default EditAge;