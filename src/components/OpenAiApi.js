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
import { UserContext } from "../context/UserContext";
import { promptsApiUrl } from "../constants/apiConstants";

/**
 * Provides AI functionality for the text area.
 */
export default function OpenAiApi({ textAreaInput, setTextAreaInput }) {
  const [unformattedNote, setUnformattedNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [isUndoListenerOn, setIsUndoLIstenerOn] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [showCustomPrompts, setShowCustomPrompts] = useState(false);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(false);
  const { isLoggedIn, userToken } = useContext(UserContext);
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

  // Clear prompts state when user logs out
  useEffect(() => {
    if (!isLoggedIn && !userToken) {
      setPrompts([]);
    }
  }, [isLoggedIn, userToken]);

  // -- DATA FETCHING --

  /**
   * Fetches prompts data from the API and stores it in state.
   */
  async function getPromptsDataFromApi() {
    setIsLoadingPrompts(true);
    try {
      const response = await axios.get(promptsApiUrl, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      setPrompts(response.data);
    } catch (error) {
      console.error("Error fetching prompts data from the API:", error.message);
    } finally {
      setIsLoadingPrompts(false);
    }
  }

  // -- CLICK HANDLERS --

  function handleAiBtnClick() {
    // Handle when text area is empty
    if (textAreaInput.trim() === "") {
      addToMessages("can't format an empty note");
      return;
    }
    sendToOpenAiApi();
  }

  function handlePromptClick(text) {
    if (textAreaInput.trim() === "") {
      addToMessages("can't format an empty note");
      return;
    }
    sendToOpenAiApi(text);
    setShowCustomPrompts(false);
  }

  function undoAiResponse() {
    setTextAreaInput(unformattedNote);
    setShowUndo(false);
    addToMessages("undone");
  }

  /**
   * Sets up the Long Press Hook, to open CustomPrompts.
   */
  const bind = useLongPress(() => {
    setShowCustomPrompts(true);
    getPromptsDataFromApi();
  });

  // -- OPEN AI API --

  /**
   * Returns a default prompt, or a custom user prompt if one has been chosen.
   */
  function assemblePrompt(userPrompt) {
    const defaultPrompt = `Correct the spelling and punctuation of this text (use UK spelling),
    only returning the formatted text, with no added comments or annotations: ${textAreaInput}`;

    // If the user hasn't chosen a custom prompt, use the default prompt
    if (userPrompt === null) {
      return defaultPrompt;
    } else {
      // Assemble the custom prompt with the text in the text area
      return `${userPrompt}: ${textAreaInput}`;
    }
  }

  /**
   * Sends a text prompt to the OpenAI API.
   */
  async function sendToOpenAiApi(userPrompt = null) {
    const prompt = assemblePrompt(userPrompt);

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: prompt,
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
        "Error retrieving AI response, check for outages at: https://status.openai.com"
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

      {showCustomPrompts && (
        <CustomPrompts
          prompts={prompts}
          handlePromptClick={handlePromptClick}
          setShowCustomPrompts={setShowCustomPrompts}
          getPromptsDataFromApi={getPromptsDataFromApi}
          isLoadingPrompts={isLoadingPrompts}
        />
      )}
    </>
  );
}
