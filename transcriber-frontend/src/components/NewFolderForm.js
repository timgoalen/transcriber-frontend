import { useState } from "react";

export default function NewFolderForm({ assembleFolder, saveFolder }) {
  const [folderName, setFolderName] = useState("");

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
      />
      <input type="submit" value="Create" onClick={handleNewFolderFormSubmit} />
    </div>
  );
}
