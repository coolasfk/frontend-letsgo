import React from "react";
import { createContext, useContext, useState } from "react";

const Context = createContext(null);
export const UseContextHook = () => useContext(Context);

const ContextProvider = ({ children }) => {
  const [image, setImage] = useState(null);
  let [actionBtnOpacity, setActionButtonOpacity] = useState(0.3);
  let [userData, setUserData] = useState({});
  let [base64, setBase64] = useState(null);
  let [chosenSports, setChosenSports] = useState([]);
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  const [newCity, setCity] = useState();
  const [cityText, setCityText] = useState("");
  const [user, setUser] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userAge, setUserAge] = useState(null);
  const [userSports, setUserSports] = useState(null);
  const [userCity, setUserCity] = useState("");
  const [userLocationServer, setUserLocationServer] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [peopleIdontWannaSeeAgain, setpeopleIdontWannaSeeAgain] = useState([]);
  const [myFriendsFetched, setMyFriendsFetched] = useState([]);
  const [arrayWithMyFriendsId, setArrayWithMyFriendsId] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Context.Provider
      value={{
        image,
        setImage,
        actionBtnOpacity,
        setActionButtonOpacity,
        userData,
        setUserData,
        base64,
        setBase64,
        chosenSports,
        setChosenSports,
        location,
        setLocation,
        userLocation,
        setUserLocation,
        newCity,
        setCity,
        cityText,
        setCityText,
        user,
        setUser,
        userName,
        setUserName,
        setUserAge,
        userAge,
        userSports,
        setUserSports,
        userCity,
        setUserCity,
        userLocationServer,
        setUserLocationServer,
        userImage,
        setUserImage,
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
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

// const TodoContext = createContext({showModal:()=>{}});
