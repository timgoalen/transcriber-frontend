import { useState, Fragment, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import FolderListItem from "../components/FolderListItem";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import NewFolderForm from "../components/NewFolderForm.js";
import MainTool from "../components/MainTool.js";
import { getNotesInFolder } from "../utils/utils.js";

export default function Folders({
  notes,
  folders,
  handleNoteItemClick,
  createFolder,
}) {
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);

  const passedData = useLocation();
  useEffect(() => {
    if (passedData.state) {
      const { savedToFolderID } = passedData.state;
      setShowNotesInFolder(savedToFolderID);
    }
  }, []);

  function handleFolderClick(id) {
    // Show/hide notes list
    showNotesInFolder === id
      ? setShowNotesInFolder(0)
      : setShowNotesInFolder(id);
  }

  function handleNewFolderFormSubmit(title) {
    setShowNewFolderForm(false);
    createFolder(title);
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
                  parentFolderID={folder.id}
                />
              )}
            </Fragment>
          );
        })}

        {showNewFolderForm ? (
          <NewFolderForm setShowNewFolderForm={setShowNewFolderForm} handleNewFolderFormSubmit={handleNewFolderFormSubmit} />
        ) : (
          <MainTool
            className="main-tool-blue"
            ariaLabel="New folder"
            onClick={() => setShowNewFolderForm(true)}
            icon={faPlus}
          />
        )}

        {folders.length === 0 && (
          <EmptyPlaceholderGraphics
            primaryColour="#268cf2"
            secondaryColour="#f28c26"
          />
        )}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
