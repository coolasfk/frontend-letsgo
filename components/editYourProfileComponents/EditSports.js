import {
  View,
  TextInput,
  StyleSheet,
  Text,
  useWindowDimensions,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import BackArrow from "../BackArrow";
import { UseContextHook } from "../../store/context/ContextProvider";
import Color from "../../style/Color";
import Style from "../../style/Style";
import ActionButton from "../ActionButton";

import { useState, useEffect } from "react";
import React from "react";
import ChooseSport from "../../components/ChooseSport";

import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
import axios from "axios";

const EditSports = ({ navigation }) => {
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
    userSports,
    setUserSports,
    chosenSports,
    setChosenSports,
  } = UseContextHook();

  const [areTwoSportsSelected, setAreTwoSportsSelected] = useState(true);

  const [text, setText] = useState("");

  useEffect(() => {
    console.log("new sports update", chosenSports, "new sports update");

    if (chosenSports.length >= 2 || chosenSports.length === 0) {
      setAreTwoSportsSelected(true);
      setText("");
    } else {
      setText(`make sure you have selected two sports`);
      setAreTwoSportsSelected(false);
    }
  }, [chosenSports]);

  const goBack = () => {
    navigation.navigate("EditYourProfile");
  };

  const updateSports = async () => {
    if (chosenSports.length < 2 && chosenSports.length > 0) {
      setText("make sure you have selected two sports");
      return console.log("make sure you have selected two sports");
    } else {
      setText("");
    }
    try {
      let updatedSports = await axios.put(
        "https://lestgo--coolasfk.repl.co/editYourProfile/updateSports/",
        { sports: chosenSports }
      );
      console.log("sports updated successfully");
      if (updatedSports) {
        setAreTwoSportsSelected(false);
        setText("you have successfully updated your sports");
        console.log("success updating sports", chosenSports);
        setUserSports(chosenSports);
        setTimeout(() => {
          setAreTwoSportsSelected(true);
          setText("");
        }, 5000);
      }
    } catch (e) {
      console.log("error updateing sports", e);
    }
  };

  return (
    <ScrollView>
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
          New activities? {"\n"} Select two sports and {"\n"} click update!
        </Text>

        <View style={design.centered}>
          <ChooseSport />

          <View
            style={[
              design.centered,
              areTwoSportsSelected ? { display: "none" } : { marginTop: 40 },
            ]}
          >
            <Text style={design.smallText}>{text}</Text>
          </View>

          <Pressable
            style={({ pressed }) => [pressed && design.pressed, { opacity: 1 }]}
          >
            <View
              style={{
                marginTop: 20,
                // marginBottom: 30,
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActionButton
                onPress={updateSports}
                cta="update your sports"
              ></ActionButton>
            </View>
          </Pressable>
          <View style={{ marginTop: 40 }}>
            <Image source={require("../../assets/skateboarderSeaLines.png")} />
          </View>
        </View>
      </View>
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
    marginTop: 0,
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

export default EditSports;
