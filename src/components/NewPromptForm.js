import { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { UserMessagesContext } from "../context/UserMessagesContext";

/**
 * Renders a form for creating a prompt.
 */
export default function NewPromptForm({
  initialPromptName,
  initialPromptID,
  handleNewPromptFormSubmit,
  handleNewPromptFormCancel
}) {
  const [prompt, setPrompt] = useState(initialPromptName);
  const { addToMessages } = useContext(UserMessagesContext);

  function updatePrompt(event) {
    setPrompt(event.target.value);
  }

  function handleCreatePromptClick(prompt) {
    if (prompt.trim() > "") {
      handleNewPromptFormSubmit(prompt, initialPromptID);
    } else {
      addToMessages("whoops, can't save an empty prompt");
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
        className="crud-new-prompt-btns"
        onClick={handleNewPromptFormCancel}
        id="new-prompt-cancel-btn"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <button
        className="crud-new-prompt-btns"
        onClick={() => handleCreatePromptClick(prompt)}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
