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
  FOLDERS_API_URL,
  searchTerms,
  displayPageChoice,
}) {
  const [isNotesListModalOpen, setIsNotesListModalOpen] = useState(false);

  // Create an array of notes in selected folder, only used to check if folder is empty
  let notesInCurrentFolder = [];
  let isEmptyFolder;

  // Include all notes if in Search page
  if (displayPageChoice === "search") {
    notesInCurrentFolder = notes;
  } else {
    notesInCurrentFolder = notes.filter(
      (note) => note.folder_id === folderChoice
    );
  }

  if (notesInCurrentFolder.length > 0) {
    isEmptyFolder = false;
  } else {
    isEmptyFolder = true;
  }

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

  let filteredNotes = [];
  // Include all folders if in Search page
  if (displayPageChoice === "search") {
    filteredNotes = notes.filter((note) =>
      note.text.toLowerCase().includes(searchTerms.toLowerCase())
    );
  } else {
    filteredNotes = notes;
  }

  return (
    <>
      {/* Add title if Note items are found in the search page */}
      {displayPageChoice === "search" && filteredNotes.length > 0 && (
        <h2 className="search-results-title">notes</h2>
      )}

      {displayPageChoice === "search"
        ? filteredNotes.map((note) => (
          // When in search page
            <NoteListItem
              id={note.id}
              text={note.text}
              folderId={note.folder_id}
              handleNoteItemClick={handleNoteItemClick}
            />
          ))
          // When in notes list
        : !isEmptyFolder
        ? notes.map(
            (note) =>
              note.folder_id === folderChoice && (
                <NoteListItem
                  id={note.id}
                  text={note.text}
                  folderId={note.folder_id}
                  handleNoteItemClick={handleNoteItemClick}
                />
              )
          )
        : // Only show placeholder SVG in "inbox"
          folderChoice === null && (
            <EmptyPlaceholderGraphics
              primaryColour="#EC7100"
              secondaryColour="#0074E8"
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
        FOLDERS_API_URL={FOLDERS_API_URL}
      />
    </>
  );
}
