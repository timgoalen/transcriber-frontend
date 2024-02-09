import { useState, Fragment } from "react";

import Header from "../components/header/Header";
import CreateNav from "../components/header/CreateNav.js";
import InboxNav from "../components/header/InboxNav.js";
import FoldersNav from "../components/header/FoldersNav.js";
import SearchBar from "../components/SearchBar.js";
import NoteListItem from "../components/NoteListItem";
import FolderListItem from "../components/FolderListItem.js";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import { findFolderColour, getNotesInFolder } from "../utils/utils.js";

export default function Search({
  notes,
  folders,
  handleNoteItemClick,
  isLoadingNotes,
  isLoadingFolders,
}) {
  const [searchTerms, setSearchTerms] = useState("");
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);

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

  return (
    <>
      <Header pageTitle="search">
        <CreateNav />
        <InboxNav />
        <FoldersNav />
      </Header>

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
                handleNoteItemClick={handleNoteItemClick}
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
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
