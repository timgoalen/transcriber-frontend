import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import NoteListItem from "./NoteListItem";
import { findFolderColour } from "../utils/utils.js";

export default function NotesInFolderDropdown({
  folders,
  notesInFolder,
  handleNoteItemClick,
  parentFolderID,
}) {
  const navigate = useNavigate();

  function handleCreateNewNoteInFolder(folderID) {
    navigate("/", { state: { passedFolderID: folderID } });
  }

  return (
    <section className="notes-in-folder-dropdown">
      {notesInFolder.map((note) => (
        <NoteListItem
          key={note.id}
          id={note.id}
          text={note.text}
          folderId={note.folder_id}
          folderColour={findFolderColour(folders, note.folder_id)}
          handleNoteItemClick={handleNoteItemClick}
        />
      ))}

      {/* Create new note in folder */}
      <div
        onClick={() => handleCreateNewNoteInFolder(parentFolderID)}
        className="list-page-item add-note-to-folder-btn"
      >
        <FontAwesomeIcon icon={faPlus} />
        <div className="add-note-to-folder-text">new note</div>
      </div>
    </section>
  );
}
