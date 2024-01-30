import { useRef, useState } from "react";

import { faArrowLeft, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFolder } from "@fortawesome/free-regular-svg-icons";

import { findNoteByID } from "../utils/utils.js";
import useClickOutside from "../hooks/useClickOutside";
import Folders from "../pages/Folders.js";
import Button from "./Button.js";
import FolderOptionItem from "./FolderOptionItem.js";
import { FolderRounded } from "@mui/icons-material";

export default function NoteDetailModal({
  notes,
  folders,
  selectedNoteID,
  modalBackBtnClick,
  setShowNoteDetailModal,
}) {
  const [showFolderOptions, setShowFolderOptions] = useState(false);
  const ref = useRef(null);
  const selectedNote = findNoteByID(notes, selectedNoteID);

  function handleClickOutside() {
    modalBackBtnClick();
  }

  useClickOutside(ref, handleClickOutside);

  return (
    <section id="note-detail-modal-container">
      {!showFolderOptions ? (
        // Display note detail
        <div id="note-detail-modal-content" ref={ref}>
          <div id="note-detail-modal-text">{selectedNote.text}</div>

          <div id="note-detail-modal-tools-container">
            <Button
              name="Back"
              icon={faArrowLeft}
              onClick={modalBackBtnClick}
            />
            <Button name="Edit" icon={faPen} onClick={() => alert("todo")} />
            <Button
              name="Folder"
              icon={faFolder}
              onClick={() => setShowFolderOptions(true)}
            />
            <Button
              name="Delete"
              icon={faTrashCan}
              onClick={() => alert("todo")}
            />
          </div>
        </div>
      ) : (
        // Display folder options
        <div id="note-detail-modal-content">
          <div id="note-detail-modal-text">
            <h2>move to folder</h2>
            {/* Inbox choice */}
            <FolderOptionItem
              key={0}
              id={null}
              title="inbox"
              colour="var(--orange)"
              selectedNote={selectedNote}
            />
            {/* Other folders */}
            {folders.map((folder) => (
              <FolderOptionItem
                key={folder.id}
                id={folder.id}
                title={folder.title}
                colour={folder.colour}
                selectedNote={selectedNote}
              />
            ))}
          </div>

          <div id="note-detail-modal-tools-container">
            <Button
              name="Back"
              icon={faArrowLeft}
              onClick={() => setShowFolderOptions(false)}
            />
            <Button
              name="Close"
              icon={faXmark}
              onClick={() => setShowNoteDetailModal(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
