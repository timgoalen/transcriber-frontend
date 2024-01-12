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
    (note) => note.folderId === folderChoice
  );

  function toggleModalVisibility() {
    setIsNotesListModalOpen(!isNotesListModalOpen);
  }

  function handleNoteItemClick(id, text, folderId) {
    selectNote(id, text, folderId);
    toggleModalVisibility();
  }

  function handleDeleteBtnClick(id) {
    deleteNote(id);
    toggleModalVisibility();
  }

  return (
    <>
      {notesInCurrentFolder.length > 0
        ? notes.map(
            (note) =>
              note.folderId == folderChoice && (
                <NoteListItem
                  id={note.id}
                  text={note.text}
                  folderId={note.folderId}
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
