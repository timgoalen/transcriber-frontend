import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function NewFolderForm({
  assembleFolder,
  saveFolder,
  cancelNewFolderForm,
  initialFolderName,
  handleFolderFormSubmit,
  initialFolderID,
}) {
  // const [folderName, setFolderName] = useState(selectedFolderName);
  const [folderName, setFolderName] = useState(initialFolderName);
  const [folderID, setFolderID] = useState(initialFolderID);

  const textInputRef = useRef(null);

  // Set focus on the text input field when the component mounts
  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  function updateFolderName(e) {
    setFolderName(e.target.value);
  }

  // function handleNewFolderFormSubmit() {
  //   const newFolder = assembleFolder(folderName);
  //   saveFolder(newFolder);
  //   setFolderName("");
  // }

  function handleNewFolderFormCancel() {
    setFolderName("");
    cancelNewFolderForm();
  }

  return (
    <>
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
        onClick={() => {
          handleFolderFormSubmit(folderName, folderID);
          setFolderName("");
          cancelNewFolderForm();
        }}
      >
        <FontAwesomeIcon icon={faCheck} />
      </button>
    </>
  );
}
