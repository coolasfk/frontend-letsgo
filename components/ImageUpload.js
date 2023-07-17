import { MaterialIcons } from "@expo/vector-icons";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Color from "../style/Color";
import { UseContextHook } from "../store/context/ContextProvider";
import * as ImageManipulator from "expo-image-manipulator";
import { useState, useEffect } from "react";
// import * as FileSystem from "expo-file-system";
const windowWidth = Dimensions.get("window").width;

const ImageUpload = () => {
  let {
    image,
    setImage,
    actionBtnOpacity,
    setActionButtonOpacity,
    userData,
    setUserData,
    base64,
    setBase64,
    
  } = UseContextHook();

  let [imageHeight, setImageHeight] = useState(null);
  let [imageWidth, setImageWidth] = useState(null);

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
        setImage(result.assets[0].uri);
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
        ("imageHeight, imageWidth", imageHeight, imageWidth);
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
      } catch (e) {
        ("now what?", e);
      }
    }
  };

  return (
    <View width={windowWidth}>
      {image ? (
        // image &&
        <View style={design.centered}>
          <MaterialIcons
            name="highlight-remove"
            size={30}
            style={design.removeIcon}
            onPress={pickImage}
          />
          <Image
            source={{ uri: `data:image/png;base64,${base64}` }}
            style={{
              width: 300,
              height: 350,
              borderRadius: 5,
              margin: 35,
              borderWidth: 0.8,
              borderColor: Color.color1,
            }}
          />
          <Text style={design.smallText}>Happy?</Text>
        </View>
      ) : (
        <View style={design.centered}>
          <View style={design.square}>
            <MaterialIcons
              name="add-a-photo"
              size={60}
              color={Color.myBgColor}
              onPress={pickImage}
            />
          </View>
          <Text style={design.smallText}>
            Share your fav pic to connect with like-minded active friends!
          </Text>
        </View>
      )}
    </View>
  );
};

const design = StyleSheet.create({
  smallText: {
    color: Color.color2,

    color: Color.fontBodyColor,
    textAlign: "center",
    fontFamily: "Quicksand_500Medium",
    fontSize: 18,
    maxWidth: 300,
    marginBottom: 0,
  },
  backArrowPosition: {
    width: "100%",
    alignContent: "left",
    marginLeft: "10%",
  },
  centered: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    // borderWidth: "1px",
    justifyContent: "center",
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 100 / 2,
    // backgroundColor: { color },
    borderWidth: 3,
    borderColor: Color.fontBodyColor,
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "10%",
    marginBottom: "10%",
    // borderWidth: "1px",
  },
  container: {
    width: "100%",

    alignItems: "center",
    justifyItems: "center",
    // borderWidth: 7,
  },
  square: {
    width: 300,
    height: 350,
    borderRadius: 5,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.color3,

    margin: 35,
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

export default ImageUpload;
