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
import { UseContextHook, useState } from "../store/context/ContextProvider";
import Style from "../style/Style";
import React, { useEffect } from "react";
import axios from "axios";
import MyFriends from "./MyFriends";

import { Entypo } from "@expo/vector-icons";
const SearchFriends = ({ navigation }) => {
  let {
    user,
    setUser,
    fetchedUsers,
    setFetchedUsers,
    userFriends,
    setUserFriends,
    peopleIdontWannaSeeAgain,
    setpeopleIdontWannaSeeAgain,
    myFriendsFetched,
    setMyFriendsFetched,
    arrayWithMyFriendsId,
    setArrayWithMyFriendsId,
    userCity,
    setUserId,
    userId,
    path
  } = UseContextHook();

  const yes = (id, newUser) => {
    let newArray = fetchedUsers.filter((el) => el.id !== id);

    setArrayWithMyFriendsId([...arrayWithMyFriendsId, id]);
    setFetchedUsers(newArray);
    putArrayWithMyFriendsIdOnTheServer(id);

    setMyFriendsFetched((prev) => {
      console.log("newUser", newUser.friends);
      let arrayFriends = newUser.friends;
      if (arrayFriends.includes(userId)) {
        console.log("userId", userId, "yes");
        prev.push(newUser);
      } else {
        console.log("no", userId);
      }

      return [...prev];
    });
  };

  const putArrayWithMyFriendsIdOnTheServer = async (id) => {
    try {
      const result = await axios.patch(
        //`https://lestgo--coolasfk.repl.co/users/updateArrayFriends`,
        `${path}users/updateArrayFriends`,
        { newFriend: id }
      );
      "arrayWithMyFriendsId result", result.data;
    } catch (error) {
      "error putting data", error;
    }
  };

  const no = (id) => {
    let newArray = fetchedUsers.filter((el) => el.id !== id);
    setpeopleIdontWannaSeeAgain([...peopleIdontWannaSeeAgain, id]);
    setFetchedUsers(newArray);
    peopleIdontWannaSeeAgainOnServer(id);
  };

  const peopleIdontWannaSeeAgainOnServer = async (id) => {
    try {
      const result = await axios.patch(
        //`https://lestgo--coolasfk.repl.co/users/peopleIdontWannaSeeAgain`,
        `${path}users/peopleIdontWannaSeeAgain`,
        { peopleIdontWannaSeeAgain: id }
      );
    } catch (error) {
      "error putting data", error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={fetchedUsers}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            age={item.age}
            sports={item.sports}
            image={item.image}
            id={item.id}
            city={item.city}
            yes={() => yes(item.id, item)}
            no={() => no(item.id, item)}
            bioFriend={item.bio}
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
  location,
  colorStars1,
  colorStars2,
  colorStars3,
  colorStars4,
  colorStars5,
  colorStars6,
  title,
  yes,
  no,
  city,
  bioFriend,
}) => {
  return (
    <View style={styles.mainContainer}>
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
      <View style={styles.containerYesNo}>
        <View id={id} onPress={no} style={styles.no}>
          <AntDesign
            id={id}
            onPress={no}
            name="close"
            size={24}
            color={Color.color9}
          />
        </View>
        <View id={id} style={styles.yes} onPress={yes}>
          <AntDesign
            id={id}
            onPress={yes}
            name="check"
            size={24}
            color={Color.color10}
          />
        </View>
      </View>
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
            <View style={styles.stars}>
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
            </View>
          </View>
          <View style={[styles.sport, { marginBottom: 30 }]}>
            <Text style={styles.text}>{sports[1]}</Text>
            <View style={styles.stars}>
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
            </View>
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
    width: 44,
    height: 44,
    borderWidth: 2,
    flexDirection: "row",
    margin: 5,
    borderRadius: 50,
    borderColor: Color.color10,
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    borderWidth: 3,
  },
  no: {
    width: 44,
    height: 44,
    borderWidth: 2,
    flexDirection: "row",
    margin: 5,
    borderRadius: 50,
    borderColor: Color.color9,
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    borderWidth: 3,
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

export default SearchFriends;
