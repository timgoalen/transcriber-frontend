import { useEffect, useState, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";
import { parseFolderIdOfNote } from "../utils/utils.js";

export default function FolderOptionItem({
  id,
  title,
  colour,
  selectedNote,
  getNotesDataFromApi,
  setShowNoteDetailModal,
}) {
  const [isParentFolder, setIsParentFolder] = useState(false);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const isSelectedNoteInInbox = selectedNote.folder_id === null;

  // TODO: change this to axios global...
  const notesApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/notes/";
  const foldersApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/folders/";

  //   TODO: explain this with comment
  useEffect(() => {
    if (isSelectedNoteInInbox && id === null) {
      setIsParentFolder(true);
    } else if (
      !isSelectedNoteInInbox &&
      parseFolderIdOfNote(selectedNote.folder_id) === id
    ) {
      setIsParentFolder(true);
    } else {
      return;
    }
  }, [selectedNote]);

  // Move note to a new folder
  async function updateNoteFolderField(noteID) {
    let updatedNote;
    if (id === null) {
      updatedNote = { folder_id: null};
    } else {
      updatedNote = { folder_id: `${foldersApiUrl}${id}/`};
    }
    try {
      const response = await axios.patch(
        `${notesApiUrl}${noteID}/`,
        updatedNote,
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.log("Note updated:", response.data);
      await getNotesDataFromApi();
      console.log(`moved to ${updatedNote.folder_id}`);
      setShowNoteDetailModal(false);
    } catch (error) {
      alert(`Error updating note: ${error.message}`);
    }
  }

  return (
    <div className="list-page-item">
      <div
        className="item-colour-block"
        style={{ backgroundColor: colour, zIndex: 1 }}
      ></div>

      <div
        className="item-text"
        onClick={() => {
          updateNoteFolderField(selectedNote.id);
        }}
      >
        <p>{title}</p>
      </div>

      {/* Show tick if folder is parent folder */}
      {isParentFolder ? (
        <div className="item-tools">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      ) : (
        <div className="item-tools">
          <FontAwesomeIcon className="folder-tick" icon={faCheck} />
        </div>
      )}
    </div>
  );
}
