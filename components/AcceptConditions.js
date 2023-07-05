import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Color from "../style/Color";
import { RadioButton } from "react-native-paper";
import * as React from "react";
import { useState } from "react";
import { UseContextHook } from "../store/context/ContextProvider";

const AcceptConditions = () => {
  const [checked, setChecked] = useState("first");
  let {
    userData,
    base64,
    chosenSports,
    setLocation,
    userLocation,
    setUserLocation,
    actionBtnOpacity,
    setActionButtonOpacity,
    setCity,
  } = UseContextHook();

  const checkBox = () => {
    if (checked === "first") {
      setChecked("second");
      setActionButtonOpacity(1);
    } else if (checked === "second") {
      setChecked("first");
      setActionButtonOpacity(0.3);
    }
  };
  let rules = `1. Age Verification: Users must confirm that they are at least 18 years old to use the app, ensuring compliance with legal age requirements.

2. Accurate Profile Information: Users must confirm that the information provided in their profile, including their name, age, and location, is accurate and up-to-date.
    
3. Photo Consent: Users must confirm that they have the necessary rights and permissions to share their own photo on the app, ensuring they are not infringing on anyone else's rights.
    
4. Responsible Photo Sharing: Users must confirm that they will only share appropriate photos of themselves, avoiding explicit, offensive, or misleading content.
    
5. Geolocation Permissions: Users must confirm that they grant the app permission to access their location information to match them with other users within their desired reach.
    
6. Respectful Interactions: Users must confirm that they will engage in respectful and polite interactions with other users, refraining from harassment, hate speech, or any form of harmful behavior.
    
7. Personal Safety Awareness: Users must confirm that they will exercise caution and take personal safety measures when interacting with other users, including meeting in public places and avoiding sharing sensitive personal information.
    
8. Reporting Inappropriate Behavior: Users must confirm their commitment to report any instances of inappropriate behavior or content encountered on the app, helping maintain a safe and positive community.
    
9. Compliance with Laws: Users must confirm that they will comply with all applicable laws and regulations while using the app, including but not limited to privacy laws, intellectual property rights, and local regulations.
    
10. Account Responsibility: Users must confirm that they are responsible for maintaining the security of their account and will not share their login credentials with others.`;

  // userData.image = base64;
  // userData.sports = chosenSports;
  // userData.location = userLocation;
  // console.log(userData);
  // fetch("https://lestgo--coolasfk.repl.co/users", {
  //   method: "POST",
  //   headers: { "content-type": "application/json" },
  //   body: JSON.stringify(userData),
  // }).catch((error) => {
  //   console.error("error:", error);
  // });

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.rulesContainer}>
        <Text style={styles.text}>{rules}</Text>
      </ScrollView>
      <View>
        <View style={styles.containerRadio}>
          <View style={[styles.radio, { marginLeft: 0 }]}>
            <RadioButton
              color={Color.fontBodyColor}
              value="first"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={checkBox}
            />
          </View>
          <Text
            style={[
              styles.text,
              {
                marginLeft: 10,
                width: 220,
                textAlign: "left",
                color: Color.color2,
                fontFamily: "Quicksand_500Medium",
              },
            ]}
          >
            By checking this box, I agree to comply with the app's rules &
            conditions.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AcceptConditions;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Quicksand_400Regular",
    // fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    color: Color.fontBodyColor,
    width: 300,
    textAlign: "center",
  },
  acceptFields: {},
  containerRadio: {
    // borderWidth: 2,
    flexDirection: "row",
    width: 300,
    marginTop: 50,
    // borderRadius: 50,
    // borderColor: Color.fontBodyColor,
    // borderWidth: 2,
    marginBottom: 30,
  },
  radio: {
    width: 50,
    height: 50,
    borderWidth: 2,
    flexDirection: "row",
    margin: 10,
    borderRadius: 50,
    borderColor: Color.fontBodyColor,
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    borderWidth: 3,
  },
  rulesContainer: {
    marginTop: 50,

    width: 300,
    height: 350,
  },
  mainContainer: {
    marginLeft: 10,
    marginRight: 10,

    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
  },
});
