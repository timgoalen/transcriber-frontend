import { useState, Fragment } from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import FolderListItem from "../components/FolderListItem";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import MainTool from "../components/MainTool.js";
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
          // TODO: remove return statement (& in inbox)
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

        {folders.length === 0 && (
          <EmptyPlaceholderGraphics
            primaryColour="#268cf2"
            secondaryColour="#f28c26"
          />
        )}

        <MainTool
          className="main-tool-blue"
          ariaLabel="New folder"
          onClick={() => alert("todo")}
          icon={faPlus}
        />
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
