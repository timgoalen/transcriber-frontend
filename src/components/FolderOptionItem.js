import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { parseFolderURL } from "../utils/utils.js";

export default function FolderOptionItem({ id, title, colour, selectedNote }) {
  const [isParentFolder, setIsParentFolder] = useState(false);
  const isSelectedNoteInInbox = selectedNote.folder_id === null;

  //   TODO: explain this with comment
  useEffect(() => {
    if (isSelectedNoteInInbox && id === null) {
      setIsParentFolder(true);
    } else if (
      !isSelectedNoteInInbox &&
      parseFolderURL(selectedNote.folder_id) === id
    ) {
      setIsParentFolder(true);
    } else {
      return;
    }
  }, [selectedNote]);

  return (
    <div className="list-page-item">
      <div
        className="item-colour-block"
        style={{ backgroundColor: colour, zIndex: 1 }}
      ></div>

      <div
        className="item-text"
        onClick={() => {
          //   handleAddNoteToFolder(id);
          //   toggleModalVisibility();
          //   setModalContentChoice("note detail view");
          alert("click");
        }}
      >
        <p>{title}</p>
      </div>

      {/* Show tick if folder is parent folder */}
      {isParentFolder && (
        <div className="item-tools">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      )}
    </div>
  );
}
