import { useState, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { promptsApiUrl } from "../constants/apiConstants";

/**
 * Renders a form for creating a prompt.
 */
export default function NewPromptForm({ setShowNewPromptForm }) {
  const [prompt, setPrompt] = useState("");
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);

  function updatePrompt(event) {
    setPrompt(event.target.value);
  }

  /**
   * Creates a new prompt.
   */
  async function createPrompt(prompt) {
    const newPrompt = { text: prompt };
    try {
      const response = await axios.post(promptsApiUrl, newPrompt, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Prompt saved:", response.data);
      addToMessages("prompt saved");
      // await getFoldersDataFromApi();
      setShowNewPromptForm(false);
    } catch (error) {
      alert(`Error saving prompt: ${error.message}`);
    }
  }

  return (
    <div className="list-page-item">
      <input
        autoFocus
        type="text"
        placeholder="Enter your prompt"
        value={prompt}
        onChange={updatePrompt}
        className="item-text"
      />

      <button
        className="crud-new-folder-btns"
        onClick={() => setShowNewPromptForm(false)}
        // TODO: change this...
        id="new-folder-cancel-btn"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <button
        // TODO: change this...
        className="crud-new-folder-btns"
        onClick={() => createPrompt(prompt)}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
