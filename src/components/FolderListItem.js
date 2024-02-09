import { useState, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { foldersApiUrl } from "../constants/apiConstants";
import DeleteFolderConfirmationPrompt from "./DeleteFolderConfirmationPrompt";

export default function FolderListItem({
  id,
  title,
  colour,
  handleFolderClick,
  handleFolderOptionsClick,
  openToolList,
  handleFolderEditClick,
  getNotesDataFromApi,
  getFoldersDataFromApi,
  showTools,
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);

  function handleDeleteBtnClick() {
    setShowDeleteConfirmation(true);
  }

  async function deleteFolder() {
    try {
      const response = await axios.delete(`${foldersApiUrl}${id}/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log(`Folder deleted: ${response.data}`);
      addToMessages("folder deleted");
      await getFoldersDataFromApi();
      await getNotesDataFromApi();
    } catch (error) {
      alert(`Error deleting folder: ${error.message}`);
      addToMessages("error deleting folder");
    }
  }

  return (
    <>
      <div className="list-page-item">
        {/* Colour block */}
        <div
          className="item-colour-block"
          style={{ backgroundColor: colour }}
        ></div>

        {/* Title */}
        <div className="item-text" onClick={() => handleFolderClick(id)}>
          <p>{title}</p>
        </div>

        {/* Toolbar */}
        {showTools && (
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
        )}
      </div>

      {showDeleteConfirmation && (
        <DeleteFolderConfirmationPrompt
          folderTitle={title}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          deleteFolder={deleteFolder}
        />
      )}
    </>
  );
}
