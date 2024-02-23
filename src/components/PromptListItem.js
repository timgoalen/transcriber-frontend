import { useState, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWandMagicSparkles,
  faSpinner,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { promptsApiUrl } from "../constants/apiConstants";
import DeleteFolderConfirmationPrompt from "./DeleteFolderConfirmationPrompt";

/**
 * Renders a prompt item.
 */
export default function PromptListItem({
  id,
  text,
  openItemTools,
  handlePromptOptionsClick,
  getPromptsDataFromApi,
  handlePromptClick,
}) {
  const { userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);

  /**
   * Deletes a prompt and notifies the user.
   */
  async function deletePrompt() {
    try {
      await axios.delete(`${promptsApiUrl}${id}/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Prompt deleted");
      addToMessages("prompt deleted");
      await getPromptsDataFromApi();
    } catch (error) {
      alert(`Error deleting prompt: ${error.message}`);
      addToMessages("error deleting prompt");
    }
  }

  return (
    <>
      <div className="list-page-item">
        <div onClick={() => handlePromptClick(text)}>
          {/* Icon */}
          <FontAwesomeIcon icon={faWandMagicSparkles} />
          {/* Text */}
          <div className="item-text">
            <p>{text}</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="folder-toolbar">
          {openItemTools === id && (
            <>
              <div
                className="folder-options"
                onClick={deletePrompt}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </>
          )}

          <div
            className="item-tools"
            onClick={() => handlePromptOptionsClick(id)}
          >
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </div>
        </div>
      </div>
    </>
  );
}
