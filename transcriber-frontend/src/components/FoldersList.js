import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faArrowLeft,
  faPen,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFolder } from "@fortawesome/free-regular-svg-icons";

import NewFolderForm from "./NewFolderForm.js";

// -- MAIN FUNCTION --

export default function FoldersList({
  notes,
  selectNote,
  selectedNote,
  deleteNote,
  deleteFolder,
  openEditPage,
  displayPageChoice,
  isColourBlock,
  showNewFolderForm,
  assembleFolder,
  saveFolder,
  cancelNewFolderForm,
}) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  function toggleDetailModal() {
    setIsDetailModalOpen(!isDetailModalOpen);
  }

  function handleFolderClick(id) {
    // selectNote(id, text);
    // toggleDetailModal();
    console.log("folder item clicked");
  }

  function handleFolderOptionsClick() {
    console.log("folder optoions clicked");
  }

  function handleFolderEditClick() {
    console.log("folder EDIT clicked");
  }

  function handleFolderDeleteClick(id) {
    deleteFolder(id);
  }

  function handleDeleteBtnClick(id) {
    deleteNote(id);
    toggleDetailModal();
  }

  return (
    // refactor into <ListItem /> components
    // <main className="list-page-main">
    <>
      {notes.map((note) => (
        <div key={note.id} id={note.id} className="list-page-item">
          <div
            className="item-colour-block"
            style={{ backgroundColor: note.colour }}
          ></div>

          <div
            className="item-text"
            onClick={() => handleFolderClick(note.id)}
          >
            <p>{note.text}</p>
          </div>

          <div className="item-tools">
            <div onClick={handleFolderOptionsClick}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>

            <div className="folder-options-container">
              <div className="folder-options" onClick={() => handleFolderEditClick(note.id, note.text)}>
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div className="folder-options" onClick={() => handleFolderDeleteClick(note.id)}>
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
          </div>
        </div>
      ))}

      {showNewFolderForm && (
        <NewFolderForm
          assembleFolder={assembleFolder}
          saveFolder={saveFolder}
          cancelNewFolderForm={cancelNewFolderForm}
        />
      )}

      {/*  -- MODAL */}

      <section
        id="detail-view-modal-container"
        style={{ display: isDetailModalOpen ? "grid" : "none" }}
      >
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
            <div
              id="folder-btn-modal"
              onClick={() => alert("TODO: create folder selection function")}
            >
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
      </section>
    </>
  );
}
