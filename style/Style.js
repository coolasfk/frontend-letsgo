import { StyleSheet } from "react-native";
import Color from "./Color";

const style = StyleSheet.create({
  headline: {
    fontFamily: "Quicksand_500Medium",

    maxWidth: 350,
    textAlign: "center",
    fontSize: 28,
    color: "#9E8142",
    marginTop: 50,
    justifyContent: "center",
    marginLeft: 25,
    marginRight: 25,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#C7D8C5",
  },
  screenLayout1: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    backgroundColor: "#C7D8C5",
    borderTopWidth: 50,

    borderColor: Color.myBgColor,
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
  smallText: {
    color: Color.color2,
    textAlign: "center",
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    maxWidth: 300,
    marginBottom: 100,
  },
});

export default style;
