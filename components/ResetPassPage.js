import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { UseContextHook } from "../store/context/ContextProvider";
import Style from "../style/Style";
import Color from "../style/Color";
import BackArrow from "./BackArrow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import ActionButton from "../components/ActionButton";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const ResetPassPage = ({ navigation, cta }) => {
  let { email, setEmail, password, setPassword } = UseContextHook();
  const { height, width, scale, fontScale } = useWindowDimensions();
  let [password2, setPassword2] = useState("");
  const [displayPassword, setDisplayPassword] = useState("none");
  const [displayPassword2, setDisplayPassword2] = useState("none");
  const [text, setText] = useState("Create a password you will remember");

  const handlePassword = (newText) => {
    setPassword(newText);
    if (password.length >= 2) {
      setDisplayPassword("flex");
    } else {
      setDisplayPassword("none");
    }
  };

  const handlePassword2 = (nextText) => {
    setPassword2(nextText);
    if (password.length >= 2) {
      setDisplayPassword2("flex");
    } else {
      setDisplayPassword2("none");
    }
  };

  const goBack = () => {
    navigation.navigate("LoginPage");
  };

  const updatePass = async () => {
    console.log("email&pass", email, password);
    try {
      if (password === password2) {
        const newPass = await axios.put(
          "https://lestgo--coolasfk.repl.co/updatePassword/",
          { email: email, password: password }
        );
        if (newPass) {
          navigation.navigate("LoginPage");
        }
      } else if (password !== password2) {
        setText("Passwords do not match");
      } else {
        console.log("error updating password");
        setText("Something went wrong, try again!");
      }
    } catch (error) {
      console.log(error, "cannot update the password");
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          alignItems: "left",
          marginLeft: 40,

          marginTop: 4,
        }}
      >
        <BackArrow onPress={goBack} />
      </View>
      <Text style={[Style.headline, { marginTop: 5, marginBottom: 20 }]}>
        {text}
      </Text>
      <View>
        <View style={design.inputContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={25}
            onChangeText={handlePassword}
            style={design.textInput}
            placeholder="type your new password here"
          ></TextInput>
          <Ionicons
            name="checkmark-circle-outline"
            size={30}
            color="green"
            display={displayPassword}
          />
        </View>
      </View>
      <View>
        <View style={design.inputContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={30}
            onChangeText={handlePassword2}
            style={design.textInput}
            placeholder="type it again ;)"
          ></TextInput>
          <Ionicons
            name="checkmark-circle-outline"
            size={30}
            color="green"
            display={displayPassword}
          />
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
        <ActionButton cta={"save my new pass"} onPress={updatePass} />
      </View>
    </View>
  );
};

const design = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    margin: 5,
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
    alignItems: "center",
    justifyContent: "top",
    height: "100%",
    width: "100%",
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

export default ResetPassPage;
