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

/**
 * Renders a prompt item.
 */
export default function PromptListItem({ id, text, openToolList, showTools }) {
  const { userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);

  function handleDeleteBtnClick() {
    // setShowDeleteConfirmation(true);
  }

  /**
   * Deletes a folder and notifies the user.
   */
  //   async function deleteFolder() {
  //     try {
  //       await axios.delete(`${foldersApiUrl}${id}/`, {
  //         headers: {
  //           Authorization: `Token ${userToken}`,
  //         },
  //       });
  //       console.log("Folder deleted");
  //       addToMessages("folder deleted");
  //       await getFoldersDataFromApi();
  //       await getNotesDataFromApi();
  //     } catch (error) {
  //       alert(`Error deleting folder: ${error.message}`);
  //       addToMessages("error deleting folder");
  //     }
  //   }

  return (
    <>
      <div className="list-page-item">
        <FontAwesomeIcon icon={faWandMagicSparkles}/>
        {/* Test */}
        <div className="item-text" onClick={() => alert("todo")}>
          <p>{text}</p>
        </div>

        {/* Toolbar */}
        {/* {showTools && (
          <div className="folder-toolbar">
            {openToolList === id && (
              <>
                <div
                  className="folder-options"
                  onClick={() => handleFolderEditClick(id)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </div>
                <div className="folder-options" onClick={handleDeleteBtnClick}>
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </>
            )}

            <div
              className="item-tools"
              onClick={() => handleFolderOptionsClick(id)}
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
}
