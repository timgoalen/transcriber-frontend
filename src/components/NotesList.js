import { useState } from "react";

import EmptyPlaceholderGraphics from "./EmptyPlaceholderGraphics.js";
import NoteListItem from "./NoteListItem.js";
import NotesListModal from "./NotesListModal.js";

// -- MAIN FUNCTION --

export default function NotesList({
  notes,
  folders,
  selectNote,
  selectedNote,
  deleteNote,
  openEditPage,
  showNewFolderForm,
  saveFolder,
  cancelNewFolderForm,
  handleAddNoteToFolder,
  folderChoice,
  handleNewFolderFormSubmit,
  handleShowNewFolderBtnClick,
}) {
  const [isNotesListModalOpen, setIsNotesListModalOpen] = useState(false);

  const notesInCurrentFolder = notes.filter(
    // The type coercion is needed, as folder_id contains numbers and "inbox" string (could change):
    (note) => note.folder_id == folderChoice
  );

  function toggleModalVisibility() {
    setIsNotesListModalOpen(!isNotesListModalOpen);
  }

  function handleNoteItemClick(id, text, folderId) {
    selectNote(id, text, folderId);
    toggleModalVisibility();
  }

  function handleDeleteBtnClick(id) {
    console.log("NotesList id:");
    console.log(id);
    deleteNote(id);
    toggleModalVisibility();
  }

  return (
    <>
      {notesInCurrentFolder.length > 0
        ? notes.map(
            (note) =>
              // The type coercion is needed, as folder_id contains numbers and "inbox" string (could change):
              note.folder_id == folderChoice && (
                <NoteListItem
                  id={note.id}
                  text={note.text}
                  folderId={note.folder_id}
                  handleNoteItemClick={handleNoteItemClick}
                />
              )
          )
        : // Only show placeholder SVG in "inbox"
          folderChoice === "inbox" && (
            <EmptyPlaceholderGraphics
              primaryColour="#f28c26"
              secondaryColour="#268cf2"
            />
          )}

      {/*  -- MODAL -- */}
      <NotesListModal
        folders={folders}
        isNotesListModalOpen={isNotesListModalOpen}
        selectedNote={selectedNote}
        toggleModalVisibility={toggleModalVisibility}
        openEditPage={openEditPage}
        handleDeleteBtnClick={handleDeleteBtnClick}
        handleAddNoteToFolder={handleAddNoteToFolder}
        saveFolder={saveFolder}
        handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
        cancelNewFolderForm={cancelNewFolderForm}
        showNewFolderForm={showNewFolderForm}
        handleNewFolderFormSubmit={handleNewFolderFormSubmit}
      />
    </>
  );
}
