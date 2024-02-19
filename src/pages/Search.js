import { useState, Fragment } from "react";

import Header from "../components/header/Header";
import SearchBar from "../components/SearchBar.js";
import NoteListItem from "../components/NoteListItem";
import FolderListItem from "../components/FolderListItem.js";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import NoteDetailModal from "../components/NoteDetailModal.js";
import useNoteDetailModal from "../hooks/useNoteDetailModal.js";
import { findFolderColour, getNotesInFolder } from "../utils/utils.js";

export default function Search({
  notes,
  folders,
  createFolder,
  isLoadingNotes,
  isLoadingFolders,
  getNotesDataFromApi,
}) {
  const [searchTerms, setSearchTerms] = useState("");
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);
  const [selectedNote, setSelectedNote] = useState({});
  const { isModalOpen, openModal, closeModal } = useNoteDetailModal();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerms.toLowerCase())
  );
  const filteredFolders = folders.filter((folder) =>
    folder.title.toLowerCase().includes(searchTerms.toLowerCase())
  );

  function handleSearchInputChange(event) {
    setSearchTerms(event.target.value);
  }

  function handleFolderClick(id) {
    // Show/hide notes list
    showNotesInFolder === id
      ? setShowNotesInFolder(0)
      : setShowNotesInFolder(id);
  }

  function handleNoteItemClick(note) {
    openModal();
    setSelectedNote(note);
  }

  return (
    <>
      <Header pageTitle="search" />

      <main>
        <section className="list-page-main">
          {isLoadingNotes || isLoadingFolders ? (
            <LoadingSpinner />
          ) : (
            <SearchBar
              searchTerms={searchTerms}
              handleSearchInputChange={handleSearchInputChange}
            />
          )}

          {/* Notes results */}
          {searchTerms && filteredNotes.length > 0 && (
            <h2 className="search-results-title">notes</h2>
          )}

          {searchTerms &&
            filteredNotes.map((note) => (
              <NoteListItem
                key={note.id}
                id={note.id}
                text={note.text}
                folderColour={findFolderColour(folders, note.folder_id)}
                onClick={() => handleNoteItemClick(note)}
              />
            ))}

          {/* Folders results */}
          {searchTerms && filteredFolders.length > 0 && (
            <h2 className="search-results-title">folders</h2>
          )}

          {searchTerms &&
            filteredFolders.map((folder) => (
              <Fragment key={folder.id}>
                <FolderListItem
                  id={folder.id}
                  title={folder.title}
                  colour={folder.colour}
                  handleFolderClick={handleFolderClick}
                  showTools={false}
                />

                {showNotesInFolder === folder.id && (
                  <NotesInFolderDropdown
                    folders={folders}
                    notesInFolder={getNotesInFolder(notes, folder.id)}
                    handleNoteItemClick={handleNoteItemClick}
                    parentFolderID={folder.id}
                  />
                )}
              </Fragment>
            ))}

          {/* No results */}
          {searchTerms &&
            filteredNotes.length === 0 &&
            filteredFolders.length === 0 && (
              <h2 id="no-results-message">no results</h2>
            )}
        </section>

        {isModalOpen && (
          <NoteDetailModal
            selectedNote={selectedNote}
            folders={folders}
            closeModal={closeModal}
            createFolder={createFolder}
            getNotesDataFromApi={getNotesDataFromApi}
          />
        )}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
