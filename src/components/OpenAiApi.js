import { useState, useContext, useEffect } from "react";

import axios from "axios";
import {
  faWandMagicSparkles,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import { UserMessagesContext } from "../context/UserMessagesContext";
import Button from "./Button.js";

export default function OpenAiApi({ textAreaInput, setTextAreaInput }) {
  const [unformattedNote, setUnformattedNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [isUndoListenerOn, setIsUndoLIstenerOn] = useState(false);
  const { addToMessages } = useContext(UserMessagesContext);

  // After formatting, hide undo button when user enters more text
  useEffect(() => {
    function removeUndoBtnOnKeyPress() {
      setShowUndo(false);
      setIsUndoLIstenerOn(false);
    };

    window.addEventListener('keydown', removeUndoBtnOnKeyPress);

    return () => {
      window.removeEventListener('keydown', removeUndoBtnOnKeyPress);
    };
  }, [isUndoListenerOn]); 
  
  
  function undoAiResponse() {
    setTextAreaInput(unformattedNote);
    setShowUndo(false);
    addToMessages("undone");
  }

  async function sendToOpenAiApi() {
    // Handle when text area is empty
    if (textAreaInput === "") {
      addToMessages("can't format an empty note");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `Format this text (use UK spelling): ${textAreaInput}`,
          max_tokens: 500,
          temperature: 0.5,
          n: 1,
          model: "gpt-3.5-turbo-instruct",
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      const reply = response.data.choices[0].text.trim();
      setIsLoading(false);
      setUnformattedNote(textAreaInput);
      setTextAreaInput(reply);
      setShowUndo(true);
      addToMessages("note formatted");
    } catch (error) {
      setIsLoading(false);
      console.error("OpenAI API Error:", error);
      alert("Error retrieving AI response");
    }
  }

  return showUndo ? (
    // Undo button
    <div id="ai-btn">
      <div className="undo-ai-response" onClick={undoAiResponse}>
        Undo
      </div>
    </div>
  ) : isLoading ? (
    // Loading spinner
    <div id="ai-btn">
      <Button name={""} icon={faSpinner} ariaLabel="Loading AI Response" />
    </div>
  ) : (
    // AI button
    <div id="ai-btn" onClick={sendToOpenAiApi}>
      <Button name={""} icon={faWandMagicSparkles} ariaLabel="AI Formatting" />
    </div>
  );
}
