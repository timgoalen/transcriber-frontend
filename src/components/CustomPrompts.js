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

  return (
    <section id="note-detail-modal-container">
      <div id="note-detail-modal-content">
        <div id="note-detail-modal-text">
          <h2>custom prompts</h2>
          {showNewPromptForm ? (
            <NewPromptForm setShowNewPromptForm={setShowNewPromptForm} />
          ) : (
            <AddAuxItemBtn
              onClick={() => setShowNewPromptForm(true)}
              text="new prompt"
            />
          )}

          {prompts.map((prompt) => (
            <PromptListItem key={prompt.id} text={prompt.text} />
          ))}
        </div>
      </div>
    </section>
  );
}
