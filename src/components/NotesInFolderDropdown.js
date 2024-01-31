import { useNavigate } from "react-router-dom";

import NoteListItem from "./NoteListItem";
import AddAuxItemBtn from "./AddAuxItemBtn.js";
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
      <AddAuxItemBtn
        onClick={() => handleCreateNewNoteInFolder(parentFolderID)}
        text="new note"
      />
    </section>
  );
}
