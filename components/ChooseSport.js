import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Color from "../style/Color";
import { useState, useEffect } from "react";
import { UseContextHook } from "../store/context/ContextProvider";
import uuid from "react-native-uuid";
uuid.v4();

let sports = [
  [
    { name: "mountain biking", color: Color.color6, key: "mountain biking" },
    { name: "surfing", color: Color.color7, key: "surfing" },
  ],
  [
    { name: "snowboarding", color: Color.color4, key: "snowboarding" },
    { name: "hiking", color: Color.color6, key: "hiking" },
  ],
  [
    { name: "frisbee", color: Color.color6, key: "frisbee" },
    { name: "rollerblading", color: Color.color9, key: "rollerblading" },
  ],
  [
    { name: "ski touring", color: Color.color4, key: "ski touring" },
    { name: "volleyball", color: Color.color6, key: "volleyball" },
  ],
  [
    { name: "bouldering", color: Color.color8, key: "bouldering" },
    { name: "paragliding", color: Color.color6, key: "paragliding" },
  ],
  [
    { name: "wakeboarding", color: Color.color7, key: "wakeboarding" },
    { name: "skiing", color: Color.color4, key: "skiing" },
  ],
  [
    { name: "trail running", color: Color.color6, key: "trail running" },
    { name: "SUP", color: Color.color7, key: "SUP" },
  ],
  [
    { name: "horseback riding", color: Color.color6, key: "horseback riding" },

    { name: "golf", color: Color.color6, key: "golf" },
  ],
  [
    { name: "basketball", color: Color.color9, key: "basketball" },

    { name: "running", color: Color.color6, key: "running" },
  ],
  [
    { name: "cycling", color: Color.color9, key: "cycling" },
    { name: "mountaineering", color: Color.color8, key: "mountaineering" },
  ],
  [
    { name: "parkour", color: Color.color9, key: "parkour" },
    { name: "rock climbing", color: Color.color8, key: "rock climbing" },
  ],
  [
    { name: "canoeing", color: Color.color7, key: "canoeing" },
    { name: "skateboarding", color: Color.color9, key: "skateboarding" },
  ],
  [
    { name: "kitesurfing", color: Color.color7, key: "kitesurfing" },
    { name: "windsurfing", color: Color.color7, key: "windsurfing" },
  ],
];

const ChooseSport = () => {
  let {
    chosenSports,
    setChosenSports,
    userData,
    setUserData,
    setActionButtonOpacity,
  } = UseContextHook();

  useEffect(() => {
    if (chosenSports.length > 2) {
      setChosenSports(chosenSports.slice(-2));
    }
  }, [chosenSports]);

  let handleSport = (name) => {
    let selected = chosenSports.includes(name);
    if (selected) {
      setChosenSports(chosenSports.filter((el) => el !== name));
    } else {
      setChosenSports([...chosenSports, name]);
    }
  };

  // ("chosenSports:", chosenSports);
  useEffect(() => {
    if (chosenSports.length === 2) {
      setActionButtonOpacity(1);
    } else {
      setActionButtonOpacity(0.3);
    }
  }, [chosenSports]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          {sports.map((pair) => (
            <View key={uuid.v4()} style={styles.container}>
              <Pressable
                key={uuid.v4()}
                onPress={() => handleSport(pair[0].name)}
                style={({ pressed }) => [pressed && styles.pressed]}
              >
                <View
                  name={pair[0].name}
                  key={uuid.v4()}
                  style={[
                    styles.sport,
                    { backgroundColor: pair[0].color },

                    {
                      borderWidth: chosenSports.includes(pair[0].name) ? 4 : 0,
                    },

                    // { borderWidth: sportBorder },
                    { borderColor: Color.color1 },
                  ]}
                >
                  <Text key={uuid.v4()} style={styles.text}>
                    {pair[0].name}
                  </Text>
                </View>
              </Pressable>
              <Pressable
                key={uuid.v4()}
                onPress={() => handleSport(pair[1].name)}
                style={({ pressed }) => [pressed && styles.pressed]}
              >
                <View
                  name={pair[1].name}
                  key={uuid.v4()}
                  style={[
                    styles.sport,
                    { backgroundColor: pair[1].color },
                    {
                      borderWidth: chosenSports.includes(pair[1].name) ? 4 : 0,
                    },

                    { borderColor: Color.color1 },
                  ]}
                >
                  <Text key={uuid.v4()} style={styles.text}>
                    {pair[1].name}
                  </Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
    transform: "translateY(2px)",
  },
  sport: {
    opacity: 1,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 30,
    paddingRight: 30,

    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: Color.fontBodyColor,
    // borderWidth: 2,
    marginRight: 4,
    marginLeft: 4,
    borderRadius: 20,
  },
  text: {
    fontFamily: "Quicksand_700Bold",
    fontSize: 20,
    color: Color.color1,
    // borderWidth: 1,
  },
  container: {
    // borderWidth: 1,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    alignItems: "center",
    // justifyContent: "center",
    justifyItems: "center",
  },
  mainContainer: {
    marginLeft: 10,
    marginRight: 10,

    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
  },
});

export default ChooseSport;
