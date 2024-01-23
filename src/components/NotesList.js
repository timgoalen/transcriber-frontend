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
}) {
  const [isNotesListModalOpen, setIsNotesListModalOpen] = useState(false);

  // Create an array of notes in selected folder, only used to check if folder is empty
  const notesInCurrentFolder = notes.filter(
    (note) => note.folder_id === folderChoice
  );

  let isEmptyFolder;

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
    console.log("NotesList id:");
    console.log(id);
    deleteNote(id);
    toggleModalVisibility();
  }

  return (
    <>
      {!isEmptyFolder
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
