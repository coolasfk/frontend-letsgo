import { Pressable } from "react-native";
import { Image, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ActionButton = ({ cta, onPress, opacity }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && style.pressed, { opacity: opacity }]}
    >
      <View style={style.container}>
        <Text style={style.text}>{cta}</Text>

        <Image
          style={style.arrow}
          source={require("../assets/actionArrow.png")}
        ></Image>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    transform: "translateY(2px)",
  },
  notCompleted: {
    opacity: 0.3,
  },
  text: {
    fontFamily: "Quicksand_700Bold",

    fontSize: 18,
    color: "#9E8142",
    // borderWidth: 2,
    marginRight: "10%",
  },
  container: {
    //    margin: "5%",

    paddingTop: "3,5%",
    paddingBottom: "3,5%",
    paddingLeft: "10%",
    paddingRight: "10%",
    borderWidth: 3,
    borderRadius: "60%",
    borderColor: "#9E8142",
    marginBottom: "2%",

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrow: {
    height: 24,
    width: 60,
  },
});
export default ActionButton;
