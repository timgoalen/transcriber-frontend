import { createContext, useState, useEffect } from "react";

export const UserMessagesContext = createContext();

export const UserMessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState("");

  // Clear the messages after 2 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setMessages("");
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [messages]);

  function addToMessages(message) {
    setMessages(message);
  }

  return (
    <UserMessagesContext.Provider value={{ messages, addToMessages }}>
      {children}
    </UserMessagesContext.Provider>
  );
};
