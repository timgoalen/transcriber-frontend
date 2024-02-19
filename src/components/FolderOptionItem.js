import { useEffect, useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  closeModal,
  folders,
}) {
  const [isParentFolder, setIsParentFolder] = useState(false);
  const { userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const navigate = useNavigate();
  const isSelectedNoteInInbox = selectedNote.folder_id === null;
  const isTargetFolderInbox = id === null;

  // Set the `isParentFolder` state so a tick can be displayed on the parent folder of the note
  useEffect(() => {
    // When the note is in the Inbox (which has `null` as an id)
    if (isSelectedNoteInInbox && id === null) {
      setIsParentFolder(true);
    } else if (
      // When a note is in another folder
      !isSelectedNoteInInbox &&
      parseFolderIdOfNote(selectedNote.folder_id) === id
    ) {
      setIsParentFolder(true);
    } else {
      // Return when the FolderOptionItem isn't the parent folder
      return;
    }
  }, [selectedNote, id, isSelectedNoteInInbox]);

  function handleNavigationOnUpdateNote(id, message) {
    if (id === null) {
      // Redirect to inbox
      navigate("/inbox", { state: { message: message } });
    } else {
      // Include folder ID in redirect so folder can be opened
      navigate("/folders", {
        state: {
          savedToFolderID: id,
          message: message,
        },
      });
    }
  }

  // Move note to a new folder
  async function updateNoteFolderField(noteID) {
    const updatedNote = isTargetFolderInbox
      ? { folder_id: null }
      : { folder_id: `${foldersApiUrl}${id}/` };

    const destinationFolderTitle = isTargetFolderInbox
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
      console.log("Note updated: ", response.data);
      const message = `moved to '${destinationFolderTitle}'`;
      handleNavigationOnUpdateNote(id, message);
      closeModal();
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
          isParentFolder
            ? addToMessages("the note is already in this folder")
            : updateNoteFolderField(selectedNote.id);
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
