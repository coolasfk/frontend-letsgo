import {
  View,
  TextInput,
  StyleSheet,
  Text,
  useWindowDimensions,
  Dimensions,
  Image,
} from "react-native";
import BackArrow from "../BackArrow";
import { UseContextHook } from "../../store/context/ContextProvider";
import Color from "../../style/Color";
import Style from "../../style/Style";
import ActionButton from "../ActionButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState, useEffect } from "react";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { SaveFormat } from "expo-image-manipulator";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
import axios from "axios";
const EditImage = ({ navigation }) => {
  const { width } = useWindowDimensions();
  let {
    setActionButtonOpacity,
    userData,
    setUserData,
    user,
    setUser,
    setBase64,
    base64,
    userImage,
    setUserImage,
  } = UseContextHook();

  const [tempUserImage, setTempUserImage] = useState(userImage);
  let isPressed;

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],

        maxWidth: 300,
        maxHeight: 350,

        base64: true,
      });

      if (!result.canceled) {
        // setImage(result.assets[0].uri);
        ("i want to change my ");

        // setImageHeight(Math.round(result.assets[0].height / 10));
        // setImageWidth(Math.round(result.assets[0].width / 10));
        (
          "height & width",
          result.assets[0].height,
          result.assets[0].width
        );

        let height = result.assets[0].height;
        let width = result.assets[0].width;

        if (height > 3000) {
          height = Math.round(result.assets[0].height / 6);
          width = Math.round(result.assets[0].width / 6);
        } else if (height > 1500 && height < 3000) {
          height = Math.round(result.assets[0].height / 3);
          width = Math.round(result.assets[0].width / 3);
        } else if (height > 5000) {
          height = Math.round(result.assets[0].height / 8);
          width = Math.round(result.assets[0].width / 8);
        } else if (height < 900) {
          height = result.assets[0].height;
          width = result.assets[0].width;
        } else if (height >= 900 && height <= 1500) {
          height = Math.round(result.assets[0].height / 2);
          width = Math.round(result.assets[0].width / 2);
        }

        setActionButtonOpacity(1);
        compressImage(result.assets[0].uri, height, width);
      }
    } catch (e) {
      ("error image-upload", e);
    }
  };

  const compressImage = async (imageUri, imageHeight, imageWidth) => {
    ("imageHeight & Width", imageHeight, imageWidth);
    ("i am trying to downscale image");
    if (imageUri !== null) {
      try {
        ("lognr4");

        const manipResult = await ImageManipulator.manipulateAsync(
          imageUri,
          [
            {
              resize: {
                height: imageHeight,
                width: imageWidth,
              },
            },
          ],
          {
            compress: 1,
            format: SaveFormat.PNG,

            base64: true,
          }
        );

        ("manipresult", manipResult.uri, manipResult.base64);
        setBase64(manipResult.base64);
        setTempUserImage(manipResult.base64);
      } catch (e) {
        ("now what?", e);
      }
    }
  };

  const updateImage = async () => {
    ("base64", base64, "base64");
    try {
      const postUpdateImage = await axios.put(
        "https://lestgo--coolasfk.repl.co/users/updateImage/",
        { image: base64 }
      );
      if (postUpdateImage) {
        (postUpdateImage.data.image, "postUpdateImage");

        setUserImage(postUpdateImage.data.image);
      }
    } catch (e) {
      ("error updateImage", e);
    }
  };

  const goBack = () => {
    navigation.navigate("EditYourProfile");
  };

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: Color.myBgColor }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View
          style={{
            width: width,
            alignItems: "left",
            marginLeft: 40,
          }}
        >
          <BackArrow onPress={goBack} />
        </View>
        <Text style={[Style.headline, { marginTop: 20 }]}>New Username?</Text>

        <View style={[design.centered, { marginTop: -10 }]}>
          <MaterialIcons
            name="highlight-remove"
            size={30}
            style={styles.removeIcon}
            onPress={pickImage}
          />
          <Image
            source={{ uri: `data:image/png;base64,${tempUserImage}` }}
            style={{
              width: 300,
              height: 350,
              borderRadius: 5,
              margin: 35,
              borderWidth: 0.8,
              borderColor: Color.color1,
            }}
          />
          <Text style={design.smallText}>
            Click on the icon in top right corner to update your pic.
          </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            // marginBottom: 30,
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActionButton
            onPress={updateImage}
            cta="update your location"
          ></ActionButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
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

    alignItems: "center",
    justifyContent: "center",

    margin: 10,
    backgroundColor: Color.color3,

    borderRadius: 45,
    padding: 15,
    maxWidth: 500,
  },
  buttonUpdateLocation: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

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
  pressed: {
    opacity: 0.7,
    transform: "translateY(2px)",
  },
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "top",
    height: "100%",
    width: windowWidth,
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
  removeIcon: {
    color: Color.myBgColor,
    position: "absolute",
    zIndex: 10,

    transform: [{ translateX: 125 }, { translateY: -158 }],
    textShadowRadius: 3,
    textShadowColor: "#969D95",
  },
});

export default EditImage;
