import { useState, useContext, useEffect } from "react";

import axios from "axios";
import { useLongPress } from "use-long-press";
import {
  faWandMagicSparkles,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/OpenAiApi.module.css";
import Button from "./Button.js";
import CustomPrompts from "./CustomPrompts.js";
import { UserMessagesContext } from "../context/UserMessagesContext";

/**
 * Provides AI functionality for the text area.
 */
export default function OpenAiApi({ textAreaInput, setTextAreaInput }) {
  const [unformattedNote, setUnformattedNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [isUndoListenerOn, setIsUndoLIstenerOn] = useState(false);
  const [showCustomPrompts, setShowCustomPrompts] = useState(false);
  const { addToMessages } = useContext(UserMessagesContext);

  // After formatting, hide undo button when user enters more text
  useEffect(() => {
    function removeUndoBtnOnKeyPress() {
      setShowUndo(false);
      setIsUndoLIstenerOn(false);
    }

    window.addEventListener("keydown", removeUndoBtnOnKeyPress);

    return () => {
      window.removeEventListener("keydown", removeUndoBtnOnKeyPress);
    };
  }, [isUndoListenerOn]);

  function undoAiResponse() {
    setTextAreaInput(unformattedNote);
    setShowUndo(false);
    addToMessages("undone");
  }

  function handleAiBtnClick() {
    // Handle when text area is empty
    if (textAreaInput === "") {
      addToMessages("can't format an empty note");
      return;
    }
    console.log("ai btn clicked");
    // sendToOpenAiApi();
  }

  /**
   * Sets up the Long Press Hook, to open CustomPrompts.
   */
  const bind = useLongPress(() => {
    setShowCustomPrompts(true);
  });

  /**
   * Sends a text prompt to the OpenAI API.
   */
  async function sendToOpenAiApi() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `Correct the spelling and punctuation of this text (use UK spelling). 
          Only return the formatted text, with no added comments or annotations: ${textAreaInput}`,
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
      setUnformattedNote(textAreaInput);
      setTextAreaInput(reply);
      setShowUndo(true);
      addToMessages("note formatted");
    } catch (error) {
      console.error("OpenAI API Error:", error);
      alert(
        "Error retrieving AI response, check if outages at: https://status.openai.com"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {showUndo ? (
        <div className={styles.AiBtn}>
          <div className={styles.UndoAiResponse} onClick={undoAiResponse}>
            Undo
          </div>
        </div>
      ) : isLoading ? (
        <div className={styles.AiBtn}>
          <Button icon={faSpinner} ariaLabel="Loading AI Response" />
        </div>
      ) : (
        <div className={styles.AiBtn} {...bind()} onClick={handleAiBtnClick}>
          <Button icon={faWandMagicSparkles} ariaLabel="AI Formatting" />
        </div>
      )}

      {showCustomPrompts && <CustomPrompts />}
    </>
  );
}
