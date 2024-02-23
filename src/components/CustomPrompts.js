import { useState, useEffect, useContext } from "react";

import axios from "axios";

import AddAuxItemBtn from "./AddAuxItemBtn";
import NewPromptForm from "./NewPromptForm";
import PromptListItem from "./PromptListItem";
import { UserContext } from "../context/UserContext";
import { promptsApiUrl } from "../constants/apiConstants";

export default function CustomPrompts() {
  const [showNewPromptForm, setShowNewPromptForm] = useState(false);
  const [prompts, setPrompts] = useState([]);
  const [isLoadingPrompts, setIsLoadingPrompts] = useState(false);
  const [openItemTools, setOpenItemTools] = useState(null);
  const { isLoggedIn, userToken } = useContext(UserContext);

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
      // note: isLoadingFolders is set to 'true' only when user first logs in
      setIsLoadingPrompts(false);
    }
  }

  useEffect(() => {
    getPromptsDataFromApi();
  }, [prompts]);

  function handlePromptOptionsClick(id) {
    openItemTools === id ? setOpenItemTools(null) : setOpenItemTools(id);
  }

  return (
    <section id="note-detail-modal-container">
      <div id="note-detail-modal-content">
        <div id="note-detail-modal-text">
          <h2>custom prompts</h2>
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

          {prompts.length === 0 && (
            // <div className="list-page-item">
            //   <div className="item-text">
            //     <p>- your prompts will show here -</p>
            //   </div>
            // </div>
            <p>
              examples for your first prompt: "Re-phrase this for clarity."
              "Summarise this."{" "}
            </p>
          )}

          {prompts.map((prompt) => (
            <PromptListItem
              key={prompt.id}
              id={prompt.id}
              text={prompt.text}
              openItemTools={openItemTools}
              handlePromptOptionsClick={handlePromptOptionsClick}
              getPromptsDataFromApi={getPromptsDataFromApi}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
