import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NewFolderForm({
  handleNewFolderFormCancel,
  handleNewFolderFormSubmit,
  initialFolderName,
  initialFolderID,
}) {
  const [folderTitle, setFolderTitle] = useState(initialFolderName);
  const [folderID, setFolderID] = useState(initialFolderID);

  function updateFolderName(e) {
    setFolderTitle(e.target.value);
  }

  return (
    <div className="list-page-item">
      <input
        autoFocus
        type="text"
        placeholder="Folder Name"
        value={folderTitle}
        onChange={updateFolderName}
        className="item-text"
      />

      <button
        className="crud-new-folder-btns"
        onClick={handleNewFolderFormCancel}
        id="new-folder-cancel-btn"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <button
        className="crud-new-folder-btns"
        onClick={() => {
          handleNewFolderFormSubmit(folderTitle, folderID);
          setFolderTitle("");
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
