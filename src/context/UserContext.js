import { createContext, useState, useEffect } from "react";

import axios from "axios";

import { baseApiUrl } from "../constants/apiConstants";

export const UserContext = createContext();

/**
 * Manages user authentication state and provides it to child components.
 */
export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [userName, setUserName] = useState("");

  // If a token exists in localStorage, use it as the auth token and show user as logged in
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("userToken");
    setUserToken(tokenFromLocalStorage);
    tokenFromLocalStorage ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isLoggedIn, userToken, userName]);

  // Save any recived tokens from the API to localStorage
  function updateUserToken(newToken) {
    setUserToken(newToken);
    localStorage.setItem("userToken", newToken);
  }

  // When logged in, request the userName from the API and save it to context
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

    if (isLoggedIn && userToken) {
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
