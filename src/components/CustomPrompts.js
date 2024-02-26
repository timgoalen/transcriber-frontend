import { useState, useContext, useRef } from "react";

import { useNavigate } from "react-router-dom";

import styles from "../styles/CustomPrompts.module.css";
import AddAuxItemBtn from "./AddAuxItemBtn";
import NewPromptForm from "./NewPromptForm";
import PromptListItem from "./PromptListItem";
import CloseAuthFormsBtn from "./CloseAuthFormsBtn";
import LoadingSpinner from "./LoadingSpinner";
import useClickOutside from "../hooks/useClickOutside.js";
import { UserContext } from "../context/UserContext";

export default function CustomPrompts({
  prompts,
  handlePromptClick,
  setShowCustomPrompts,
  getPromptsDataFromApi,
  isLoadingPrompts,
}) {
  const [showNewPromptForm, setShowNewPromptForm] = useState(false);
  const [openItemTools, setOpenItemTools] = useState(null);
  const ref = useRef(null);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  function handlePromptOptionsClick(id) {
    openItemTools === id ? setOpenItemTools(null) : setOpenItemTools(id);
  }

  // Show new prompt for if user is logged in
  function handleNewPromptClick() {
    if (isLoggedIn) {
      setShowNewPromptForm(true);
    } else {
      navigate("/login");
    }
  }

  function handleClickOutside() {
    setShowCustomPrompts(false);
  }

  useClickOutside(ref, handleClickOutside);

  return (
    <section className={styles.ModalContainer}>
      <div className={styles.ModalContent} ref={ref}>
        <div className={styles.ModalText}>
          <h2>custom prompts</h2>

          {showNewPromptForm ? (
            <NewPromptForm
              setShowNewPromptForm={setShowNewPromptForm}
              getPromptsDataFromApi={getPromptsDataFromApi}
            />
          ) : (
            <AddAuxItemBtn
              // onClick={() => setShowNewPromptForm(true)}
              onClick={handleNewPromptClick}
              text="new prompt"
            />
          )}

          {isLoadingPrompts ? (
            <LoadingSpinner />
          ) : (
            prompts.map((prompt) => (
              <PromptListItem
                key={prompt.id}
                id={prompt.id}
                text={prompt.text}
                openItemTools={openItemTools}
                handlePromptOptionsClick={handlePromptOptionsClick}
                getPromptsDataFromApi={getPromptsDataFromApi}
                handlePromptClick={handlePromptClick}
              />
            ))
          )}

          {prompts.length === 0 && (
            <p className={styles.PlaceholderText}>
              Examples for your first prompt: "Re-phrase this for clarity",
              "Summarise this".
            </p>
          )}
        </div>

        <CloseAuthFormsBtn onClick={() => setShowCustomPrompts(false)} />
      </div>
    </section>
  );
}
