import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faArrowLeft,
  faPen,
  faEllipsisVertical,
  faXmark,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faFolder,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";

import NewFolderForm from "./NewFolderForm.js";
import FoldersList from "./FoldersList.js";
import Button from "./Button.js";
import EmptyPlaceholderGraphics from "./EmptyPlaceholderGraphics.js";

// -- MAIN FUNCTION --

export default function NotesList({
  notes,
  folders,
  selectNote,
  selectedNote,
  deleteNote,
  openEditPage,
  // displayPageChoice,
  // isColourBlock,
  showNewFolderForm,
  assembleFolder,
  saveFolder,
  cancelNewFolderForm,
  handleAddNoteToFolder,
  inboxNotes,
  folderChoice,
  handleNewFolderFormSubmit,
  handleShowNewFolderBtnClick,
}) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isModalForFolderSelection, setIsModalForFolderSelection] =
    useState(false);

  function toggleDetailModal() {
    setIsDetailModalOpen(!isDetailModalOpen);
  }

  function handleItemClick(id, text, folderId) {
    selectNote(id, text, folderId);
    toggleDetailModal();
  }

  function handleFolderBtnClick() {
    setIsModalForFolderSelection(true);
  }

  function handleDeleteBtnClick(id) {
    deleteNote(id);
    toggleDetailModal();
  }

  const notesInCurrentFolder = notes.filter(
    (note) => note.folderId === folderChoice
  );

  return (
    // refactor into <ListItem /> components
    // <main className="list-page-main">
    <>
      {notesInCurrentFolder.length > 0
        ? notes.map(
            (note) =>
              note.folderId == folderChoice && (
                <div
                  key={note.id}
                  id={note.id}
                  className="list-page-item"
                  onClick={() =>
                    handleItemClick(note.id, note.text, note.folderId)
                  }
                >
                  <div className="item-text">
                    <p>{note.text}</p>
                  </div>
                  <div className="item-tools">
                    <FontAwesomeIcon icon={faExpand} />
                  </div>
                </div>
              )
          )
        : // Only show placeholder SVG in "inbox"
          folderChoice === "inbox" && (
            <EmptyPlaceholderGraphics
              primaryColour="#f28c26"
              secondaryColour="#268cf2"
            />
          )}

      {/*  -- MODAL **refactor into component */}
      <section
        id="detail-view-modal-container"
        style={{ display: isDetailModalOpen ? "grid" : "none" }}
      >
        {!isModalForFolderSelection ? (
          // Modal handles note detail view
          <div id="detail-view-modal-content">
            <div id="detail-view-modal-text">{selectedNote.text}</div>
            <div id="detail-view-modal-tools-container">
              <div id="back-btn-modal" onClick={toggleDetailModal}>
                {/* refactor to "Button" component */}
                <FontAwesomeIcon icon={faArrowLeft} />
                <div>Back</div>
              </div>
              <div id="edit-btn-modal" onClick={openEditPage}>
                <FontAwesomeIcon icon={faPen} />
                <div>Edit</div>
              </div>
              <div id="folder-btn-modal" onClick={handleFolderBtnClick}>
                <FontAwesomeIcon icon={faFolder} />
                <div>Folder</div>
              </div>
              <div
                id="delete-btn-modal"
                onClick={() => handleDeleteBtnClick(selectedNote.id)}
              >
                <FontAwesomeIcon icon={faTrashCan} />
                <div>Delete</div>
              </div>
            </div>
          </div>
        ) : (
          // Modal handles adding note to a folder
          <div id="detail-view-modal-content">
            <div id="detail-view-modal-text">
              <h2>move to folder</h2>
              {/* Inbox */}
              <div key="1" className="list-page-item">
                <div
                  className="item-colour-block"
                  style={{ backgroundColor: "var(--orange)", zIndex: 1 }}
                ></div>
                <div
                  className="item-text"
                  onClick={() => {
                    handleAddNoteToFolder("inbox");
                    setIsDetailModalOpen(false);
                    setIsModalForFolderSelection(false);
                  }}
                >
                  <p>inbox</p>

                  {selectedNote.folderId === "inbox" && (
                    <FontAwesomeIcon icon={faCheck} />
                  )}
                </div>
              </div>
              {/* Other folders */}
              {folders.map((folder) => (
                <div key={folder.id} id={folder.id} className="list-page-item">
                  <div
                    className="item-colour-block"
                    style={{ backgroundColor: folder.colour, zIndex: 1 }}
                  ></div>
                  <div
                    className="item-text"
                    onClick={() => {
                      handleAddNoteToFolder(folder.id);
                      setIsDetailModalOpen(false);
                      setIsModalForFolderSelection(false);
                    }}
                  >
                    <p>{folder.text}</p>

                    {selectedNote.folderId === folder.id && (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </div>
                </div>
              ))}

              {showNewFolderForm ? (
                /* New folder form */
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
                /* Create new folder */
                <div
                  onClick={handleShowNewFolderBtnClick}
                  className="list-page-item add-note-to-folder-btn"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              )}
            </div>
            {/* Modal tools */}
            <div id="detail-view-modal-tools-container">
              <div
                id="back-btn-modal"
                onClick={() => setIsModalForFolderSelection(false)}
              >
                {/* refactor to "Button" component */}
                <FontAwesomeIcon icon={faArrowLeft} />
                <div>Back</div>
              </div>
              <div id="delete-btn-modal" onClick={toggleDetailModal}>
                <FontAwesomeIcon icon={faXmark} />
                <div>Close</div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
