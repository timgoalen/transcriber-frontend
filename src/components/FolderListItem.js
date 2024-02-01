import { useState, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "../context/UserContext";

export default function FolderListItem({
  id,
  title,
  colour,
  handleFolderClick,
  handleFolderOptionsClick,
  openToolList,
  handleFolderEditClick,
  getAllDataFromApi,
}) {
  const { userToken } = useContext(UserContext);
  // TODO:replace with axios globals
  const foldersApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/folders/";

  function handleDeleteBtnClick() {
    alert(`Delete '${title}' and all of its contents?`);
    deleteFolder();
  }

  async function deleteFolder() {
    try {
      const response = await axios.delete(`${foldersApiUrl}${id}/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Folder deleted:", response.data);
      await getAllDataFromApi();
    } catch (error) {
      alert(`Error deleting folder: ${error.message}`);
    }
  }

  return (
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
      <div className="folder-toolbar">
        {openToolList === id && (
          <>
            <div className="folder-options" onClick={handleDeleteBtnClick}>
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div
              className="folder-options"
              // onClick={() => handleFolderDeleteClick(id)}
            >
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
    </div>
  );
}
