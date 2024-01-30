import { useState, Fragment } from "react";

import { faListUl } from "@fortawesome/free-solid-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import FolderListItem from "../components/FolderListItem";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown";
import { getNotesInFolder } from "../utils/utils.js";

export default function Folders({ notes, folders, handleNoteItemClick }) {
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);

  function handleFolderClick(id) {
    // Show/hide notes list
    showNotesInFolder === id
      ? setShowNotesInFolder(0)
      : setShowNotesInFolder(id);
  }

  return (
    <>
      <AltPageHeader
        title="folders"
        cornerIcon={faListUl}
        cornerIconLinkTo="/inbox"
      />

      <main className="list-page-main">
        {folders.map((folder) => {
          return (
            <Fragment key={folder.id}>
              <FolderListItem
                id={folder.id}
                title={folder.title}
                colour={folder.colour}
                handleFolderClick={handleFolderClick}
              />
              {showNotesInFolder === folder.id && (
                <NotesInFolderDropdown
                  folders={folders}
                  notesInFolder={getNotesInFolder(notes, folder.id)}
                  handleNoteItemClick={handleNoteItemClick}
                />
              )}
            </Fragment>
          );
        })}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
