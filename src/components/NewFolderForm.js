import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NewFolderForm({
  setShowNewFolderForm,
  handleNewFolderFormSubmit,
  //   cancelNewFolderForm,
  //   initialFolderName,
  //   handleFolderFormSubmit,
  //   initialFolderID,
}) {
  //   const [folderName, setFolderName] = useState(initialFolderName);
  const [folderName, setFolderName] = useState("");
  //   const [folderID, setFolderID] = useState(initialFolderID);
  const [folderID, setFolderID] = useState(null);

  function updateFolderName(e) {
    setFolderName(e.target.value);
  }

  function handleNewFolderFormCancel() {
    setFolderName("");
    setShowNewFolderForm(false);
  }

  return (
    <div className="list-page-item">
      <input
        autoFocus
        type="text"
        placeholder="Folder Name"
        value={folderName}
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
          handleNewFolderFormSubmit(folderName, folderID);
          setFolderName("");
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
