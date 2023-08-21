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

import axios from "axios";

import ActionButton from "../components/ActionButton";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const SendEmailToResetPassword = ({ navigation }) => {
  let { email, setEmail, codeToResetPass, setCodeToResetPass } =
    UseContextHook();

  let [text, setText] = useState("Type in your email to reset your password");
  let [cta, setCta] = useState("reset your password");
  let [isEmailNotSent, setIsEmailNotSent] = useState(true);
  const [displayEmail, setDisplayEmail] = useState("none");
  const [number1, setNumber1] = useState("&#9733");
  const [number2, setNumber2] = useState("&#9733");
  const [number3, setNumber3] = useState("&#9733");
  const [number4, setNumber4] = useState("&#9733");
  const { height, width, scale, fontScale } = useWindowDimensions();

  // const generateRandomNumber = () => {
  //   let randomNumber = Math.floor(Math.random() * 9000 + 1000);

  //   console.log(codeToResetPass, "+codeToResetPass 0 before");

  //   setCodeToResetPass(randomNumber);
  //   console.log(codeToResetPass, "++codeToResetPass 1 after");

  //   // setTimeout(() => {
  //   //   console.log(codeToResetPass, "+++codeToResetPass 2 after after");
  //   // }, 1000);
  //   setTimeout(() => {
  //     randomNumber = Math.floor(Math.random() * 9000 + 1000);
  //     setCodeToResetPass(randomNumber);
  //     console.log(codeToResetPass, "codeToResetPass 2");
  //   }, 100000);
  // };
  // let code;
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsEmailNotSent(false);
  //     setEmail(`\u2726`);
  //     setEmail("");
  //     setEmail("a");
  //     console.log("email", email);
  //     setNumber1(`\u2726`);
  //     code = Math.floor(Math.random() * 9000 + 1000);
  //     setCodeToResetPass(code);
  //     console.log(codeToResetPass, "+codeToResetPass 0 before");

  //     // setCodeToResetPass(randomNumber);

  //     // setTimeout(() => {
  //     //   console.log(codeToResetPass, "+++codeToResetPass 2 after after");
  //     // }, 1000);
  //     setTimeout(() => {
  //       code = Math.floor(Math.random() * 9000 + 1000);
  //       // setCodeToResetPass(randomNumber);
  //       console.log(code, "codeToResetPass 2");
  //     }, 100000);
  //   }, 5000);
  //   console.log("------------- new line", code);
  // }, []);

  const handleNumber1 = (newText) => {
    console.log(newText, typeof newText);
    setNumber1(newText);
    console.log("number1", number1);
  };

  const handleNumber2 = (newText) => {
    setNumber2(newText);
  };
  const handleNumber3 = (newText) => {
    setNumber3(newText);
  };
  const handleNumber4 = (newText) => {
    setNumber4(newText);
  };

  const handleEmail = (newText) => {
    setEmail(newText);
    console.log("email", email);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailPattern.test(email)) {
      setDisplayEmail("flex");
    } else {
      setDisplayEmail("none");
    }
  };

  const goBack = () => {
    navigation.navigate("LoginPage");
  };

  const submitCode = () => {
    let codeToCheck = number1 + number2;
    codeToCheck += number3;
    codeToCheck += number4;
    codeToCheck = parseInt(codeToCheck);

    // code = "5087";
    console.log(
      codeToResetPass,
      "code",
      typeof codeToResetPass,
      codeToCheck,
      typeof codeToCheck
    );
    if (codeToCheck === codeToResetPass) {
      navigation.navigate("ResetPassPage");
      console.log("yes");
    } else {
      setText("The code you entered is not correct.");
    }
  };

  const resetPassword = async () => {
  

    // setTimeout(() => {
    //   console.log(codeToResetPass, "+++codeToResetPass 2 after after");
    // }, 1000);
    // setTimeout(() => {
    //   randomNumber = Math.floor(Math.random() * 9000 + 1000);
    //   setCodeToResetPass(randomNumber);
    //   console.log(codeToResetPass, "codeToResetPass 2");
    // }, 100000);

    try {
      const resetedPassword = await axios.post(
        "https://lestgo--coolasfk.repl.co/resetPass/",
        { email: email }
      );

      if (resetedPassword) {
        // setEmail("");
        // setEmail(`\u2726`);
        console.log("success", resetedPassword.data, resetedPassword.data.code);
        setCodeToResetPass(resetedPassword.data.code);
        setTimeout(() => {
          let randomNumber = Math.floor(Math.random() * 900000 + 100000);
          setCodeToResetPass(randomNumber);
          console.log("new code", codeToResetPass);
        }, 120000);
        setIsEmailNotSent(false);
        setText(
          "Enter the secret code you received in your email into the fields."
        );
        // setNumber1(`\u2726`);
        setCta("resend the code");
      }
    } catch (error) {
      console.log("error reseting password", error);
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
      <Text style={[Style.headline, { marginTop: 5, marginBottom: 25 }]}>
        {text}
      </Text>

      <View style={isEmailNotSent ? { display: "flex" } : { display: "none" }}>
        <View style={design.inputContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={25}
            onChangeText={handleEmail}
            style={design.textInput}
            placeholder="your email"
          ></TextInput>
          <Ionicons
            name="checkmark-circle-outline"
            size={30}
            color="green"
            display={displayEmail}
          />
        </View>
      </View>

      <View
        style={
          isEmailNotSent
            ? { display: "none" }
            : { display: "flex", flexDirection: "row" }
        }
      >
        <View style={design.numericContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={1}
            onChangeText={handleNumber1}
            style={design.textInput}
            keyboardType="numeric"
            placeholder={`\u2726`}
          ></TextInput>
        </View>
        <View style={design.numericContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={1}
            onChangeText={handleNumber2}
            style={design.textInput}
            keyboardType="numeric"
            placeholder={`\u2726`}
          ></TextInput>
        </View>
        <View style={design.numericContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={1}
            onChangeText={handleNumber3}
            style={design.textInput}
            placeholder={`\u2726`}
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View style={design.numericContainer}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            maxLength={1}
            onChangeText={handleNumber4}
            style={design.textInput}
            keyboardType="numeric"
            placeholder={`\u2726`}
          ></TextInput>
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
        <ActionButton cta={cta} onPress={resetPassword} />
        {isEmailNotSent ? null : (
          <ActionButton cta={"submit code"} onPress={submitCode} />
        )}
      </View>
    </View>
  );
};

const design = StyleSheet.create({
  numericContainer: {
    flexDirection: "row",
    justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    margin: 2,
    backgroundColor: Color.color3,

    borderRadius: 60,
    paddingLeft: 10,
    paddingBottom: 25,
    paddingTop: 25,
    paddingRight: 0,
    // maxWidth: 500,
  },
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

export default SendEmailToResetPassword;
