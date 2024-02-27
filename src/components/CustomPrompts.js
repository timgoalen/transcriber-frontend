import { useState, useContext, useRef, Fragment } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "../styles/CustomPrompts.module.css";
import AddAuxItemBtn from "./AddAuxItemBtn";
import NewPromptForm from "./NewPromptForm";
import PromptListItem from "./PromptListItem";
import CloseBtn from "./CloseBtn";
import LoadingSpinner from "./LoadingSpinner";
import useClickOutside from "../hooks/useClickOutside.js";
import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { promptsApiUrl } from "../constants/apiConstants";

export default function CustomPrompts({
  prompts,
  handlePromptClick,
  setShowCustomPrompts,
  getPromptsDataFromApi,
  isLoadingPrompts,
}) {
  const [showNewPromptForm, setShowNewPromptForm] = useState(false);
  const [openItemTools, setOpenItemTools] = useState(null);
  const [editPromptTitle, setEditPromptTitle] = useState(0);
  const ref = useRef(null);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const navigate = useNavigate();

  function handlePromptOptionsClick(id) {
    openItemTools === id ? setOpenItemTools(null) : setOpenItemTools(id);
  }

  // Show new prompt form if user is logged in
  function handleNewPromptClick() {
    if (isLoggedIn) {
      setShowNewPromptForm(true);
    } else {
      navigate("/login");
    }
  }

  function handlePromptEditClick(id) {
    setEditPromptTitle(id);
  }

  function handleClickOutside() {
    setShowCustomPrompts(false);
  }

  useClickOutside(ref, handleClickOutside);

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

  /**
   * Updates a prompt.
   */
  async function updatePrompt(prompt, id) {
    const updatedPrompt = { text: prompt };
    setEditPromptTitle(0);
    setOpenItemTools(null);
    try {
      const response = await axios.patch(
        `${promptsApiUrl}${id}/`,
        updatedPrompt,
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.log("Prompt updated:", response.data);
      addToMessages("prompt updated");
      getPromptsDataFromApi();
    } catch (error) {
      alert("Error updating prompt:", error.message);
      addToMessages("error updating prompt");
    }
  }

  return (
    <section className={styles.ModalContainer}>
      <div className={styles.ModalContent} ref={ref}>
        <div className={styles.ModalText}>
          <h2>custom prompts</h2>

          {showNewPromptForm ? (
            <NewPromptForm
              setShowNewPromptForm={setShowNewPromptForm}
              getPromptsDataFromApi={getPromptsDataFromApi}
              initialPromptName=""
              initialPromptID={null}
              handleNewPromptFormSubmit={createPrompt}
              handleNewPromptFormCancel={() => setOpenItemTools(false)}
            />
          ) : (
            <AddAuxItemBtn onClick={handleNewPromptClick} text="new prompt" />
          )}

          {isLoadingPrompts ? (
            <LoadingSpinner />
          ) : (
            prompts.map((prompt) => (
              <Fragment key={prompt.id}>
                {/* Show a form to edit the prompt if selected */}
                {editPromptTitle === prompt.id ? (
                  <NewPromptForm
                    setShowNewPromptForm={setShowNewPromptForm}
                    getPromptsDataFromApi={getPromptsDataFromApi}
                    initialPromptName={prompt.text}
                    initialPromptID={prompt.id}
                    handleNewPromptFormSubmit={updatePrompt}
                    handleNewPromptFormCancel={() => setEditPromptTitle(0)}
                  />
                ) : (
                  <PromptListItem
                    id={prompt.id}
                    text={prompt.text}
                    openItemTools={openItemTools}
                    handlePromptOptionsClick={handlePromptOptionsClick}
                    getPromptsDataFromApi={getPromptsDataFromApi}
                    handlePromptClick={handlePromptClick}
                    handlePromptEditClick={handlePromptEditClick}
                  />
                )}
              </Fragment>
            ))
          )}

          {prompts.length === 0 && (
            <p className={styles.PlaceholderText}>
              Examples for your first prompt: "Re-phrase this for clarity",
              "Summarise this".
            </p>
          )}
        </div>

        <CloseBtn onClick={() => setShowCustomPrompts(false)} />
      </div>
    </section>
  );
}
