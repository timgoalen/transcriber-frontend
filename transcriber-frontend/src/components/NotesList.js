import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExpand,
  faArrowLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// -- MAIN FUNCTION --

export default function NotesList({
  notes,
  selectNote,
  selectedNote,
  deleteNote,
  openEditPage,
}) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  function toggleDetailModal() {
    setIsDetailModalOpen(!isDetailModalOpen);
  }

  function handleItemClick(id, text) {
    selectNote(id, text);
    toggleDetailModal();
  }

  function handleDeleteBtnClick(id) {
    deleteNote(id);
    toggleDetailModal();
  }

  return (
    // refactor into <ListItem /> components
    <main className="list-page-main">
      {notes.map((note) => (
        <div
          key={note.id}
          id={note.id}
          className="list-page-item"
          onClick={() => handleItemClick(note.id, note.text)}
        >
          <div className="item-text">
            <p>{note.text}</p>
          </div>
          <div className="item-tools">
            <FontAwesomeIcon icon={faExpand} />
          </div>
        </div>
      ))}

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
              id="delete-btn-modal"
              onClick={() => handleDeleteBtnClick(selectedNote.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              <div>Delete</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
