import NoteListItem from "./NoteListItem";
import { findFolderColour } from "../utils/utils.js";

export default function NotesInFolderDropdown({
  folders,
  notesInFolder,
  handleNoteItemClick,
}) {
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
    </section>
  );
}
