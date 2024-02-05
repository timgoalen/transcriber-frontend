import { createContext, useState, useEffect } from "react";

export const UserMessagesContext = createContext();

export const UserMessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState("");

  function addToMessages(message) {
    setMessages(message);
  }

//   const storedMessage = localStorage.getItem("message");
//   console.log(storedMessage);

//   if (storedMessage) {
//     setMessages(storedMessage);
//   }

  useEffect(() => {
    // const storedMessage = localStorage.getItem("message");
    // console.log(storedMessage);
    setTimeout(() => {
      setMessages(""), 2000;
    });
    // if (storedMessage) {
    //   setMessages(storedMessage);
    // }
  }, []);

  return (
    <UserMessagesContext.Provider value={{ messages, addToMessages }}>
      {children}
    </UserMessagesContext.Provider>
  );
};
