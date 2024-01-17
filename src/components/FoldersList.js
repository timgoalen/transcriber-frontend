import { useState, Fragment } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faEllipsisVertical,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import NewFolderBtn from "./NewFolderBtn.js";
import NewFolderForm from "./NewFolderForm.js";
import NotesList from "./NotesList.js";
import EmptyPlaceholderGraphics from "./EmptyPlaceholderGraphics.js";

// -- MAIN FUNCTION --

export default function FoldersList({
  folders,
  selectNote,
  selectedNote,
  deleteNote,
  deleteFolder,
  openEditPage,
  showNewFolderForm,
  assembleFolder,
  saveFolder,
  cancelNewFolderForm,
  handleUpdateFolderFormSubmit,
  notes,
  handleAddNoteToFolder,
  handleNewFolderFormSubmit,
  handleCreateNewNoteinFolderClick,
  handleShowNewFolderBtnClick,
  FOLDERS_API_URL_NO_HTTPS,
}) {
  const [openToolList, setOpenToolList] = useState(0);
  const [editTitle, setEditTitle] = useState(0)
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);

  // -- EVENT HANDLERS --

  function handleFolderClick(id) {
    if (showNotesInFolder === id) {
      setShowNotesInFolder(0);
    } else {
      setShowNotesInFolder(id);
    }
  }

  function handleFolderOptionsClick(id) {
    if (openToolList === id) {
      // Close tool list if already open
      setOpenToolList(0);
    } else {
      setOpenToolList(id);
    }
  }

  function handleFolderEditClick(id) {
    setEditTitle(id);
  }

  function handleFolderDeleteClick(id) {
    deleteFolder(id);
  }

  function handleFolderEditCancelBtnClick() {
    setEditTitle(0);
    setOpenToolList(0);
  }

  return (
    // refactor into <ListItem /> components
    <>
      {folders && folders.length > 0 ? (
        /* Folders list */
        folders.map((folder) => (
          <Fragment key={folder.id}>
            <div id={folder.id} className="list-page-item">
              {/* Replace normal div with a text input form when user clicks on edit icon */}
              {editTitle === folder.id ? (
                <NewFolderForm
                  initialFolderName={folder.title}
                  assembleFolder={assembleFolder}
                  saveFolder={saveFolder}
                  cancelNewFolderForm={handleFolderEditCancelBtnClick}
                  selectedFolderName={folder.title}
                  handleFolderFormSubmit={handleUpdateFolderFormSubmit}
                  initialFolderID={folder.id}
                />
              ) : (
                <>
                  <div
                    className="item-colour-block"
                    style={{ backgroundColor: folder.colour }}
                  ></div>

                  <div
                    className="item-text"
                    onClick={() => handleFolderClick(folder.id)}
                  >
                    <p>{folder.title}</p>
                  </div>

                  <div className="folder-toolbar">
                    {/* Display extra tools when user clicks on ellipsis */}
                    {openToolList === folder.id && (
                      <>
                        <div
                          className="folder-options"
                          onClick={() => handleFolderEditClick(folder.id)}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </div>
                        <div
                          className="folder-options"
                          onClick={() => handleFolderDeleteClick(folder.id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </div>
                      </>
                    )}
                    <div
                      className="item-tools"
                      onClick={() => handleFolderOptionsClick(folder.id)}
                    >
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {showNotesInFolder === folder.id && (
              <section className="notes-in-folder-dropdown">
                <NotesList
                  notes={notes}
                  folders={folders}
                  selectNote={selectNote}
                  selectedNote={selectedNote}
                  deleteNote={deleteNote}
                  openEditPage={openEditPage}
                  handleAddNoteToFolder={handleAddNoteToFolder}
                  folderChoice={FOLDERS_API_URL_NO_HTTPS + `${folder.id}/`}
                  handleNewFolderFormSubmit={handleNewFolderFormSubmit}
                  cancelNewFolderForm={cancelNewFolderForm}
                  handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
                  showNewFolderForm={showNewFolderForm}
                  FOLDERS_API_URL_NO_HTTPS={FOLDERS_API_URL_NO_HTTPS}
                />

                {/* Create new note in folder */}
                <div
                  onClick={() => handleCreateNewNoteinFolderClick(folder.id)}
                  className="list-page-item add-note-to-folder-btn"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </section>
            )}
          </Fragment>
        ))
      ) : (
        /* Render placeholder SVG when no folders exist */
        <EmptyPlaceholderGraphics
          primaryColour="#268cf2"
          secondaryColour="#f28c26"
        />
      )}

      {/* SHOW NEW FOLDER FORM OR BUTTON */}

      {showNewFolderForm ? (
        <div className="list-page-item">
          <NewFolderForm
            initialFolderName=""
            assembleFolder={assembleFolder}
            saveFolder={saveFolder}
            cancelNewFolderForm={cancelNewFolderForm}
            handleFolderFormSubmit={handleNewFolderFormSubmit}
          />
        </div>
      ) : (
        <NewFolderBtn
          handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
        />
      )}
    </>
  );
}
