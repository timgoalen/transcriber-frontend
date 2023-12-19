import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function NewFolderForm({ assembleFolder, saveFolder }) {
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
        className="create-new-folder-btn"
        onClick={handleNewFolderFormSubmit}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </div>
  );
}
