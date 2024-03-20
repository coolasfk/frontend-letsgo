import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
} from "react-native";
import Style from "../style/Style";
import BackArrow from "./BackArrow";
import Color from "../style/Color";
import { UseContextHook } from "../store/context/ContextProvider";
import ActionButton from "./ActionButton";
import { axios } from "axios";
import { Entypo } from "@expo/vector-icons";

const DeleteFriend = ({ navigation }) => {
  const { width } = useWindowDimensions();
  let {
    friendId,
    friendName,
    friendImage,
    friendBio,
    friendAge,
    friendSports,
    friendCity,
    path
  } = UseContextHook();

  const goBack = () => {
    navigation.navigate("Chat");
  };

  const deleteFriend = async () => {
    try {
      let deletedFriend = await axios.delete(
        //`https://lestgo--coolasfk.repl.co/deleteFriend`,
        `${path}deleteFriend`,
        { friendId: friendId }
      );
      console.log("deleted friend?", deletedFriend);
      navigation.navigate("AfterLoginPage");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={[styles.container, { width: width }]}>
      <View style={[styles.container, { width: width }]}>
        <View
          style={{
            width: width,
            alignItems: "left",
            marginLeft: 40,
          }}
        >
          <BackArrow onPress={goBack} />
        </View>
        <View style={styles.container}>
          <Item
            name={friendName}
            age={friendAge}
            sports={friendSports}
            image={friendImage}
            city={friendCity}
            id={friendId}
            bioFriend={friendBio}
          />
          <View>
            <ActionButton
              onPress={deleteFriend}
              cta={"remove this friend"}
            ></ActionButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const Item = ({
  id,
  name,
  age,
  sports,
  image,
  bioFriend,

  colorStars1,
  colorStars2,
  colorStars3,
  colorStars4,
  colorStars5,
  colorStars6,
  title,
  city,
}) => {
  return (
    <View style={[styles.mainContainer]}>
      <Image
        // source={{ uri: image }}
        source={{ uri: `data:image/png;base64,${image}` }}
        style={{
          width: 300,
          height: 300,
          borderRadius: 5,
          margin: 30,
          borderWidth: 0.8,
          borderColor: Color.color1,
        }}
      />

      <View>
        <Text style={[Style.headline, { marginTop: 0, marginBottom: 10 }]}>
          {name}, {age}
        </Text>

        <View
          style={
            bioFriend
              ? {
                  justifyContent: "center",

                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 10,
                }
              : { display: "none" }
          }
        >
          <Text style={styles.smallText}>{bioFriend}</Text>
        </View>
        <View style={styles.sportContainer}>
          <View style={styles.sport}>
            <Text style={styles.text}>{sports[0]}</Text>
            {/* <View style={styles.stars}>
                <AntDesign
                  name="star"
                  margin={1}
                  size={15}
                  color={Color.color1}
                />
                <AntDesign
                  name="star"
                  margin={1}
                  size={15}
                  color={Color.color1}
                />
                <AntDesign
                  name="star"
                  margin={1}
                  size={15}
                  color={Color.color1}
                />
              </View> */}
          </View>
          <View style={[styles.sport, { marginBottom: 30 }]}>
            <Text style={styles.text}>{sports[1]}</Text>
            {/* <View style={styles.stars}>
                <AntDesign
                  name="star"
                  margin={1}
                  size={15}
                  color={Color.color1}
                />
                <AntDesign
                  name="star"
                  margin={1}
                  size={15}
                  color={Color.color1}
                />
                <AntDesign
                  name="star"
                  margin={1}
                  size={15}
                  color={Color.color1}
                />
              </View> */}
          </View>
          <View
            style={{
              justifyContent: "center",

              alignItems: "center",
              flexDirection: "row",
              marginBottom: 15,
              marginTop: -10,
            }}
          >
            <Entypo
              name="location-pin"
              size={24}
              color={Color.color2}
              marginRight={3}
              marginBottom={7}
            />
            <Text style={styles.smallText}>{city}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "top",
    height: "100%",

    backgroundColor: "#C7D8C5",
    paddingTop: 25,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
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
  sport: {
    opacity: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.fontBodyColor,

    marginRight: 4,
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 20,
  },
  sportContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    color: Color.color1,
  },
  stars: {
    flexDirection: "row",
    marginLeft: 20,
  },

  mainContainer: {
    flexDirection: "column",
  },
});

export default DeleteFriend;
