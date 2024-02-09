import { createContext, useState, useEffect } from "react";

import axios from "axios";

import { baseApiUrl } from "../constants/apiConstants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("userToken");
    setUserToken(tokenFromLocalStorage);
    tokenFromLocalStorage ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isLoggedIn, userToken, userName]);

  function updateUserToken(newToken) {
    setUserToken(newToken);
    localStorage.setItem("userToken", newToken);
  }

  useEffect(() => {
    async function getUserName() {
      try {
        const usernameResponse = await axios.get(`${baseApiUrl}users/`, {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        });
        const userName = await usernameResponse.data[0].username;
        setUserName(userName);
      } catch (error) {
        console.error("Error retrieving username:", error.message);
      }
    }

    if (isLoggedIn) {
      getUserName();
    }
  }, [isLoggedIn, userToken]);

  return (
    <UserContext.Provider
      value={{ isLoggedIn, userToken, updateUserToken, userName }}
    >
      {children}
    </UserContext.Provider>
  );
};
