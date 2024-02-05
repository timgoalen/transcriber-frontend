import { useEffect, useState, useContext } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { notesApiUrl, foldersApiUrl } from "../constants/apiConstants";
import { parseFolderIdOfNote, findFolderTitleByID } from "../utils/utils.js";

export default function FolderOptionItem({
  id,
  title,
  colour,
  selectedNote,
  getNotesDataFromApi,
  setShowNoteDetailModal,
  folders,
}) {
  const [isParentFolder, setIsParentFolder] = useState(false);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const isSelectedNoteInInbox = selectedNote.folder_id === null;
  const isTargetFolderInbox = id === null;

  console.log("isSelectedNoteInInbox");
  console.log(isSelectedNoteInInbox);

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
    let updatedNote = isTargetFolderInbox
    ? { folder_id: null }
    : { folder_id: `${foldersApiUrl}${id}/` };
    
    let destinationFolderTitle = isTargetFolderInbox
      ? "inbox"
      : findFolderTitleByID(folders, id);

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
      console.log(`Note updated: ${response.data}`);
      addToMessages(`moved to '${destinationFolderTitle}'`);
      setShowNoteDetailModal(false);
      await getNotesDataFromApi();
    } catch (error) {
      addToMessages("error moving note");
      console.log(`Error updating note: ${error.message}`);
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
