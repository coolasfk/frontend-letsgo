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
const NewFriends = () => {
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
  } = UseContextHook();

  const yes = (e) => {
    elToAdd =
      e.target._internalFiberInstanceHandleDEV._debugOwner.pendingProps.id;
    let newArray = fetchedUsers.filter((el) => el.id !== elToAdd);

    setArrayWithMyFriendsId([...arrayWithMyFriendsId, elToAdd]);
    setFetchedUsers(newArray);
    console.log("fetchedFriends", arrayWithMyFriendsId);
  };

  useEffect(() => {
    putArrayWithMyFriendsIdOnTheServer();
  }, [arrayWithMyFriendsId]);

  const putArrayWithMyFriendsIdOnTheServer = async () => {
    try {
      const result = await axios.patch(
        `https://lestgo--coolasfk.repl.co/users/updateArrayFriends`,
        { arrayWithMyFriendsId: arrayWithMyFriendsId }
      );

      console.log("arrayWithMyFriendsId result", result.data);
    } catch (error) {
      console.log("error putting data", error);
    } finally {
      console.log("arrayWithMyFriendsId SUCCESS");
    }
  };

  const no = (e) => {
    console.log(
      "e target",
      e.target._internalFiberInstanceHandleDEV._debugOwner.pendingProps.id
    );
    elToRemoveId =
      e.target._internalFiberInstanceHandleDEV._debugOwner.pendingProps.id;
    let newArray = fetchedUsers.filter((el) => el.id !== elToRemoveId);
    setpeopleIdontWannaSeeAgain([...peopleIdontWannaSeeAgain, elToRemoveId]);
    console.log("peopleIdontWannaSeeAgain", peopleIdontWannaSeeAgain);
    setFetchedUsers(newArray);
  };

  useEffect(() => {
    peopleIdontWannaSeeAgainOnServer();
  }, [peopleIdontWannaSeeAgain]);

  const peopleIdontWannaSeeAgainOnServer = async () => {
    try {
      const result = await axios.patch(
        `https://lestgo--coolasfk.repl.co/users/peopleIdontWannaSeeAgain`,
        { peopleIdontWannaSeeAgain: peopleIdontWannaSeeAgain }
      );

      console.log("526626262626262662result", result.data);
    } catch (error) {
      console.log("error putting data", error);
    }
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
  }) => {
    return (
      <View style={styles.mainContainer}>
        <Image
          source={{ uri: image }}
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
          </View>
        </View>
      </View>
    );
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
          ></Item>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
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

export default NewFriends;
