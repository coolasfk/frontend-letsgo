import { Text, View, StyleSheet, Image } from "react-native";
import ActionButton from "./ActionButton";

const WelcomeScreen = ({ cta, onPress, navigation }) => {
  const goToStartScreen = () => {
    navigation.navigate("RegisterSignUp");
  };
  const moveToSignUpScreen = () => {
    navigation.navigate("LoginPage");
  };

  return (
    <View style={style.container}>
      <Text style={[style.headline, { marginTop: 50 }]}>
        Find your adventure friends. Make every moment count.
      </Text>
      <View style={style.containerForLogo}>
        <Image style={style.image} source={require("../assets/MainLogo.png")} />
      </View>
      <ActionButton cta={"join us"} onPress={goToStartScreen} />
      <ActionButton
        cta={"welcome back"}
        onPress={moveToSignUpScreen}
      ></ActionButton>
    </View>
  );
};

const style = StyleSheet.create({
  headline: {
    fontFamily: "Quicksand_500Medium",
    width: "80%",
    textAlign: "center",
    fontSize: 28,
    color: "#9E8142",
    marginTop: "10%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#C7D8C5",
  },
  image: {
    width: "59%",
    height: "100%",
  },
  containerForLogo: {
    width: "100%",
    height: "50%",

    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",

    margin: "10%",
  },
});

export default WelcomeScreen;
