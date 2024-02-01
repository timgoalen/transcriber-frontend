import { useRef, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { faArrowLeft, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFolder } from "@fortawesome/free-regular-svg-icons";
import { FolderRounded } from "@mui/icons-material";

import { UserContext } from "../context/UserContext";
import { findNoteByID } from "../utils/utils.js";
import useClickOutside from "../hooks/useClickOutside";
import Folders from "../pages/Folders.js";
import Button from "./Button.js";
import FolderOptionItem from "./FolderOptionItem.js";
import NewFolderForm from "./NewFolderForm.js";
import AddAuxItemBtn from "./AddAuxItemBtn.js";

export default function NoteDetailModal({
  notes,
  folders,
  selectedNoteID,
  modalBackBtnClick,
  setShowNoteDetailModal,
  createFolder,
  getNotesDataFromApi,
}) {
  const [showFolderOptions, setShowFolderOptions] = useState(false);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const { userToken } = useContext(UserContext);
  const selectedNote = findNoteByID(notes, selectedNoteID);
  const navigate = useNavigate();
  const ref = useRef(null);
  // TODO: replace with axios globals
  const notesApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/notes/";

  async function deleteNote() {
    try {
      const response = await axios.delete(`${notesApiUrl}${selectedNoteID}/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Note deleted", response.data);
      await getNotesDataFromApi();
      setShowNoteDetailModal(false);
    } catch (error) {
      alert(`Error deleting note: ${error.message}`);
    }
  }

  function handleClickOutside() {
    modalBackBtnClick();
  }

  useClickOutside(ref, handleClickOutside);

  function handleNewFolderFormSubmitInModal(title) {
    setShowNewFolderForm(false);
    createFolder(title);
  }

  function handleEditBtnClick() {
    setShowNoteDetailModal(false);
    navigate("/edit", { state: { selectedNote: selectedNote } });
  }

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
            <Button name="Edit" icon={faPen} onClick={handleEditBtnClick} />
            <Button
              name="Folder"
              icon={faFolder}
              onClick={() => setShowFolderOptions(true)}
            />
            <Button name="Delete" icon={faTrashCan} onClick={deleteNote} />
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
              getNotesDataFromApi={getNotesDataFromApi}
              setShowNoteDetailModal={setShowNoteDetailModal}
            />

            {/* Other folders */}
            {folders.map((folder) => (
              <FolderOptionItem
                key={folder.id}
                id={folder.id}
                title={folder.title}
                colour={folder.colour}
                selectedNote={selectedNote}
                getNotesDataFromApi={getNotesDataFromApi}
                setShowNoteDetailModal={setShowNoteDetailModal}
              />
            ))}

            {/* Create new folder */}
            {showNewFolderForm ? (
              <NewFolderForm
                handleNewFolderFormSubmit={handleNewFolderFormSubmitInModal}
                setShowNewFolderForm={setShowNewFolderForm}
              />
            ) : (
              <AddAuxItemBtn
                onClick={() => setShowNewFolderForm(true)}
                text="new folder"
              />
            )}
          </div>

          {/* Tools */}
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
