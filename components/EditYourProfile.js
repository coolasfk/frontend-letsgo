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
const design = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    // justifyItems: "center",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
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

export default EditYourProfile;
