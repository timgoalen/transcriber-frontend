import { useState } from "react";

import styles from "../styles/CustomPrompts.module.css";
import AddAuxItemBtn from "./AddAuxItemBtn";
import NewPromptForm from "./NewPromptForm";
import PromptListItem from "./PromptListItem";
import CloseAuthFormsBtn from "./CloseAuthFormsBtn";
import LoadingSpinner from "./LoadingSpinner";

export default function CustomPrompts({
  prompts,
  handlePromptClick,
  setShowCustomPrompts,
  getPromptsDataFromApi,
  isLoadingPrompts,
}) {
  const [showNewPromptForm, setShowNewPromptForm] = useState(false);
  const [openItemTools, setOpenItemTools] = useState(null);

  function handlePromptOptionsClick(id) {
    openItemTools === id ? setOpenItemTools(null) : setOpenItemTools(id);
  }

  return (
    <section className={styles.ModalContainer}>
      <div className={styles.ModalContent}>
        <div className={styles.ModalText}>
          <h2>custom prompts</h2>

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

          {showNewPromptForm ? (
            <NewPromptForm
              setShowNewPromptForm={setShowNewPromptForm}
              getPromptsDataFromApi={getPromptsDataFromApi}
            />
          ) : (
            <AddAuxItemBtn
              onClick={() => setShowNewPromptForm(true)}
              text="new prompt"
            />
          )}
        </div>

        <CloseAuthFormsBtn onClick={() => setShowCustomPrompts(false)} />
      </div>
    </section>
  );
}
