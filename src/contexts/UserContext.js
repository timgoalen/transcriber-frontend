import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("userToken");
    setUserToken(tokenFromLocalStorage);
    tokenFromLocalStorage ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [isLoggedIn, userToken]);

  function updateUserToken(newToken) {
    setUserToken(newToken);
    console.log(`state: `)
    console.log(newToken)
    localStorage.setItem("userToken", newToken);
    console.log(`localStorage: `)
  }

  return (
    <UserContext.Provider value={{ isLoggedIn, userToken, updateUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
