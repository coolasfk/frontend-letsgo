import {
  View,
  TextInput,
  StyleSheet,
  Text,
  useWindowDimensions,
  Dimensions,
  Image,
  FlatList,
} from "react-native";

import BackArrow from "./BackArrow";
import { UseContextHook } from "../store/context/ContextProvider";
import Color from "../style/Color";
import Style from "../style/Style";
import ActionButton from "./ActionButton";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useCallback, useRef } from "react";

import * as React from "react";
const windowWidth = Dimensions.get("window").width;
import * as Location from "expo-location";
import { Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import EditName from "./editYourProfileComponents/EditName";
import { AntDesign } from "@expo/vector-icons";
import UserNameData from "./UserNameData";
import { KeyboardAwareScrollView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

import uuid from "react-native-uuid";
import socketIOClient from "socket.io-client";

const ENDPOINT = "https://lestgo.coolasfk.repl.co";
//const ENDPOINT = `${path}`;
// import { io } from "socket.io-client";

// const ENDPOINT = socketIOClient("ws://lestgo.coolasfk.repl.co");

const socket = socketIOClient(ENDPOINT);

const Chat = ({ navigation }) => {
  const { width, height } = useWindowDimensions();

  let {
    setActionButtonOpacity,
    userData,
    setUserData,
    user,
    setUser,
    friendId,
    friendName,
    friendImage,
    friendBio,
    friendAge,
    friendSports,
    friendCity,
    userId,
    userName,
    messages,
    setMessages,
    userImage,
  } = UseContextHook();

  const goBack = () => {
    navigation.navigate("AfterLoginPage");
  };

  const goToDeleteFriend = () => {
    navigation.navigate("DeleteFriend");
  };

  // var ws = new WebSocket("wss://lestgo.coolasfk.repl.co/");
  useEffect(() => {
    //   console.log("use effect runs");
    //   const serverMessagesList = [];

    //   ws.onopen = () => {
    //     console.log("connection is open");
    //     setServerState("Connected to the server");
    //     setDisableButton(false);
    //   };

    //   ws.onclose = (e) => {
    //     console.log("connection is close");
    //     setServerState("Disconnected. Check internet or server.");
    //     setDisableButton(true);
    //   };

    //   ws.onerror = (e) => {
    //     setServerState(e.message);
    //   };

    socket.on("room", (data) => {
      console.log("room", data, typeof data);

      // messages.push(data);
      // setMessages([...messages]);
      // messages;

      // const createdMessage = {
      //   _id: response.data._id,
      //   text: response.data.text,
      //   createdAt: new Date(response.data.createdAt),
      //   user: {
      //     _id: userId,
      //     name: userName,
      //   },
      // };

      const createdMessage = {
        _id: uuid.v4(),
        text: data,
        createdAt: new Date().toString(),
        user: {
          _id: userId,
          name: userName,
        },
      };

      setMessages((messages) => GiftedChat.append(messages, createdMessage));
      // }  // );
    });
  }, []);

  // const submitMessage = () => {
  //   ws.send(messageText);
  //   setMessageText("this runs");
  //   setInputFieldEmpty(true);
  // };

  useEffect(() => {
    fetchMessages();

    return () => {};
  }, []);

  const fetchMessages = async () => {
    console.log("fetching messages");
    try {
      const response = await axios.get(
        //`https://lestgo--coolasfk.repl.co/messages/${userId}/${friendId}`
        `${path}messages/${userId}/${friendId}`,
      );

      const messagesData = response.data.map((message) => ({
        _id: message._id,
        key: message._id,
        text: message.text,
        createdAt: new Date(message.createdAt),

        user: {
          _id: message.sender,
          name: userName,
          avatar: `data:image/png;base64,${userImage}`,
        },
      }));

      setMessages(messagesData);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const onSend = async (newMessages = []) => {
    console.log("test1");

    // const messageObj = {
    //   _id: uuid(),
    //   text: newMessages[0].text,
    //   senderId: userId,
    //   receiverId: friendId,
    // };

    try {
      const response = await axios.post(
        //`https://lestgo--coolasfk.repl.co/messages/`,
        `${userId}messages/`,

        {
          text: newMessages[0].text,

          senderId: userId,
          receiverId: friendId,
        }
      );
      console.log("test2");
      const createdMessage = {
        _id: response.data._id,
        text: response.data.text,
        createdAt: new Date(response.data.createdAt),
        user: {
          _id: userId,
          name: userName,
        },
      };
      console.log("test3");

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, createdMessage)
      );
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
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

      <View style={{ width: width, height: height - 200 }}>
        <GiftedChat
          onPressAvatar={goToDeleteFriend}
          sent={true}
          renderUsernameOnMessage={true}
          isTyping={true}
          placeholder={"Don't be shy, type something here ;)"}
          // showUserAvatar={showUserAvatar}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userId,
          }}
        />
      </View>
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
    height: 700,
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

export default Chat;
