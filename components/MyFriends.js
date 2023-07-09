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

const MyFriends = () => {
  let { myFriendsFetched } = UseContextHook();
  console.log({ myFriendsFetched });

  const messageFriend = () => {
    console.log("i am messaging my friends here");
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
            messageFriend={messageFriend}
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
  messageFriend,
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

      <View>
        <View style={styles.containerYesNo}>
          <View id={id} style={styles.yes} onPress={messageFriend}>
            <AntDesign
              id={id}
              onPress={messageFriend}
              name="message1"
              size={43}
              color={Color.color10}
            />
          </View>
        </View>
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
