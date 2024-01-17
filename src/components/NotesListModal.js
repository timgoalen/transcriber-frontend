import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPen,
  faXmark,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFolder } from "@fortawesome/free-regular-svg-icons";

import NewFolderForm from "./NewFolderForm.js";

export default function NotesListModal({
  folders,
  isNotesListModalOpen,
  selectedNote,
  toggleModalVisibility,
  openEditPage,
  handleDeleteBtnClick,
  handleShowNewFolderBtnClick,
  handleAddNoteToFolder,
  showNewFolderForm,
  cancelNewFolderForm,
  assembleFolder,
  saveFolder,
  handleNewFolderFormSubmit,
  FOLDERS_API_URL_NO_HTTPS,
}) {
  const [modalContentChoice, setModalContentChoice] =
    useState("note detail view");

  function handleFolderBtnClick() {
    setModalContentChoice("folder select view");
  }

  // -- RENDER ELEMENTS --

  return (
    <section
      id="detail-view-modal-container"
      style={{ display: isNotesListModalOpen ? "grid" : "none" }}
    >
      {/* Note detail view */}

      {modalContentChoice === "note detail view" && (
        <div id="detail-view-modal-content">
          <div id="detail-view-modal-text">{selectedNote.text}</div>

          <div id="detail-view-modal-tools-container">
            {/* TODO: REFACTOR THESE INTO 'BUTTON' COMPONENTS */}
            <div id="back-btn-modal" onClick={toggleModalVisibility}>
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
      )}

      {/* Folder select view */}

      {modalContentChoice === "folder select view" && (
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
                  toggleModalVisibility();
                  setModalContentChoice("note detail view");
                }}
              >
                <p>inbox</p>
              </div>
              {/* Show tick for conaining folder */}
              {/* TODO: REFACTOR INTO COMPONENT, USED 20ish LINES BELOW TOO */}
              {selectedNote.folderId === null && (
                <div className="item-tools">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
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
                    toggleModalVisibility();
                    setModalContentChoice("note detail view");
                  }}
                >
                  <p>{folder.title}</p>
                </div>
                {/* Show tick for conaining folder */}
                {selectedNote.folderId === FOLDERS_API_URL_NO_HTTPS + `${folder.id}/` && (
                  <div className="item-tools">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                )}
              </div>
            ))}

            {/* TODO: similar thing in FoldersList.js line 171, refactor into component? */}
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

          <div id="detail-view-modal-tools-container">
            <div
              id="back-btn-modal"
              onClick={() => setModalContentChoice("note detail view")}
            >
              {/* refactor to "Button" component */}
              <FontAwesomeIcon icon={faArrowLeft} />
              <div>Back</div>
            </div>
            <div id="delete-btn-modal" onClick={toggleModalVisibility}>
              <FontAwesomeIcon icon={faXmark} />
              <div>Close</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
