import { Ionicons } from "@expo/vector-icons";
import Color from "../style/Color";
import { StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native";

const BackArrow = ({ onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && design.pressed}
      onPress={onPress}
    >
      <View style={design.backBtn}>
        <Ionicons
          style={design.icon}
          name="arrow-back-circle"
          size={20}
          //   color={Color.fontBodyColor}
          //   marginRight={5}
          //   marginBottom={5}
        />
        <Text>back</Text>
      </View>
    </Pressable>
  );
};

const design = StyleSheet.create({
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "5%",
  },
  pressed: {
    opacity: 0.5,
    transform: "translateY(2px)",
  },
  icon: {
    color: Color.fontBodyColor,
    marginRight: "2%",

    // transform: "translateY(2px)",
  },
});

export default BackArrow;
