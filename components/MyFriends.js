import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Color from "../style/Color";
import { UseContextHook } from "../store/context/ContextProvider";
import Style from "../style/Style";
import React from "react";
import { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const MyFriends = ({ navigation }) => {
  let {
    myFriendsFetched,
    bio,
    setBio,
    setFriendId,
    setFriendName,
    setFriendImage,
    setFriendBio,
    setFriendAge,
    setFriendSports,
    setFriendCity,
  } = UseContextHook();

  const goToChat = (id, name, image, bio, age, sports, city) => {
    setFriendId(id);
    setFriendName(name);
    setFriendImage(image);
    setFriendBio(bio);
    setFriendAge(age);
    setFriendSports(sports);
    setFriendCity(city);
    console.log("id", id, "logged id");
    navigation.navigate("Chat");
    console.log("a");
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={myFriendsFetched}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            age={item.age}
            sports={item.sports}
            image={item.image}
            city={item.city}
            id={item.id}
            bioFriend={item.bio}
            goToChat={() =>
              goToChat(
                item.id,
                item.name,
                item.image,
                item.bioFriend,
                item.age,
                item.sports,
                item.city
              )
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const Item = ({
  id,
  name,
  age,
  sports,
  image,
  bioFriend,
  location,
  colorStars1,
  colorStars2,
  colorStars3,
  colorStars4,
  colorStars5,
  colorStars6,
  title,
  goToChat,
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
        <View style={styles.containerYesNo}>
          <View id={id} style={styles.yes} onPress={goToChat}>
            <AntDesign
              id={id}
              onPress={goToChat}
              name="message1"
              size={43}
              color={Color.color10}
            />
          </View>
        </View>
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
    // borderWidth: 2,
    marginRight: 4,
    marginLeft: 4,
    marginTop: 4,
    marginBottom: 4,
    borderRadius: 20,
  },
  text: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 18,
    color: Color.color1,
    // borderWidth: 1,
  },
  stars: {
    flexDirection: "row",
    marginLeft: 20,
  },
  mainContainer: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderColor: Color.fontBodyColor,
  },
  sportContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  yes: {
    width: 45,
    height: 45,
    // borderWidth: 2,
    flexDirection: "row",
    marginBottom: 8,
    borderRadius: 50,
    // borderColor: Color.color10,
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    // borderWidth: 3,
  },

  containerYesNo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default MyFriends;
