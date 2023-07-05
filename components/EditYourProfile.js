import { Text, View, StyleSheet } from "react-native";
import BackArrow from "./BackArrow";
import { UseContextHook } from "../store/context/ContextProvider";
import Color from "../style/Color";
import Style from "../style/Style";

const EditYourProfile = ({ navigation }) => {
  let { user, setUser } = UseContextHook();
  //   "https://lestgo--coolasfk.repl.co/users/:email1/",
  const goToFindBuddy = () => {
    navigation.navigate("FindBuddy");
  };
  return (
    <View style={[Style.container, { borderWidth: 3, borderColor: "red" }]}>
      <View style={Design.form}>
        <Text>Stefania</Text>
      </View>

      <BackArrow onPress={goToFindBuddy} />
    </View>
  );
};

const Design = StyleSheet.create({
  form: {
    marginTop: 100,
    color: Color.fontBodyColor,
  },
});

export default EditYourProfile;
