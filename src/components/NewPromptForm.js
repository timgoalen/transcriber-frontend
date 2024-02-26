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
export default function NewPromptForm({
  setShowNewPromptForm,
  getPromptsDataFromApi,
}) {
  const [prompt, setPrompt] = useState("");
  const { userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);

  function updatePrompt(event) {
    setPrompt(event.target.value);
  }

  function handleCreatePromptClick(prompt) {
    if (prompt.trim() > "") {
      createPrompt(prompt);
    } else {
      addToMessages("whoops, can't save an empty prompt");
    }
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
      await getPromptsDataFromApi();
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
        id="new-folder-cancel-btn"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <button
        className="crud-new-folder-btns"
        onClick={() => handleCreatePromptClick(prompt)}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
