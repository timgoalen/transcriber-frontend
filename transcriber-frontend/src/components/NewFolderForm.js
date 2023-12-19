import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NewFolderForm({ assembleFolder, saveFolder, cancelNewFolderForm }) {
  const [folderName, setFolderName] = useState("");
  const textInputRef = useRef(null);

  // Set focus on the text input field when the component mounts
  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  function updateFolderName(e) {
    setFolderName(e.target.value);
  }

  function handleNewFolderFormSubmit() {
    const newFolder = assembleFolder(folderName);
    saveFolder(newFolder);
    setFolderName("");
  }

  function handleNewFolderFormCancel() {
    setFolderName("");
    cancelNewFolderForm();
  }

  return (
    <div className="list-page-item">
      <input
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={updateFolderName}
        className="item-text"
        ref={textInputRef}
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
        onClick={handleNewFolderFormSubmit}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
