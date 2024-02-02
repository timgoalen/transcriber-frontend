import { createContext, useState, useEffect } from "react";

import axios from "axios";

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

  async function getUserName() {
    try {
      const usernameResponse = await axios.get(
        "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/users/",
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      const userName = await usernameResponse.data[0].username;
      setUserName(userName);
    } catch (error) {
      console.error("Error retrieving username:", error.message);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserName();
    }
  }, [isLoggedIn])

  return (
    <UserContext.Provider value={{ isLoggedIn, userToken, updateUserToken, userName }}>
      {children}
    </UserContext.Provider>
  );
};
