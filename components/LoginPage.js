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

const LoginPage = ({ navigation, cta }) => {
  let { email, setEmail, password, setPassword } = UseContextHook();
  const { height, width, scale, fontScale } = useWindowDimensions();

  const [displayEmail, setDisplayEmail] = useState("none");
  const [displayPassword, setDisplayPassword] = useState("none");

  const handleEmail = (newText) => {
    setEmail(newText);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    // console.log("------userData email", userData);
    if (emailPattern.test(email)) {
      setDisplayEmail("flex");
      saveEmailAndPass();
      //   Alert.alert("Valid Email", "The email address is valid.");
    } else {
      setDisplayEmail("none");
    }
  };
  const handlePassword = (newText) => {
    setPassword(newText);
    if (password.length >= 2) {
      saveEmailAndPass();
      setDisplayPassword("flex");
    } else {
      setDisplayPassword("none");
    }
  };

  const goToFindBuddy = () => {
    navigation.navigate("FindBuddy");
  };

  const goBack = () => {
    navigation.navigate("WelcomeScreen");
  };

  const saveEmailAndPass = async () => {
    try {
      // const email = JSON.stringify(userData.email1)
      await AsyncStorage.setItem("email", email);
      // const password = JSON.stringify(userData.password)
      await AsyncStorage.setItem("password", password);
    } catch (e) {
      console.log(e);
    }
  };

  const isUserInDBLogIn = async () => {
    console.log("email & password", email, password);

    // let email = await AsyncStorage.getItem("email");
    // let password = await AsyncStorage.getItem("password");
    // console.log("email & password", email, password);
    // email = "a";
    // password = "a";

    let result;

    try {
      result = await axios.post(
        "https://lestgo--coolasfk.repl.co/users/:email1/",
        { email1: email, password: password }
      );

      if (result === null || undefined) {
        console.log("user not found");
        return;
      } else {
        console.log("result", result.data);
        goToFindBuddy();
      }
    } catch (e) {
      console.log("user not found", e);
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
        Hope you still remember your details
      </Text>

      <View>
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
            color={"green"}
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

      <View
        style={{
          marginTop: 10,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActionButton cta={"enter"} onPress={isUserInDBLogIn} />

        <ActionButton cta={"oops I don't remember"} onPress={isUserInDBLogIn} />
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

export default LoginPage;
