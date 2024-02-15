import { useRef, useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFolder } from "@fortawesome/free-regular-svg-icons";

import Button from "./Button.js";
import FolderOptionItem from "./FolderOptionItem.js";
import NewFolderForm from "./NewFolderForm.js";
import AddAuxItemBtn from "./AddAuxItemBtn.js";
import useClickOutside from "../hooks/useClickOutside";
import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { notesApiUrl } from "../constants/apiConstants";

export default function NoteDetailModal({
  selectedNote,
  folders,
  closeModal,
  createFolder,
  getNotesDataFromApi,
}) {
  const [showFolderOptions, setShowFolderOptions] = useState(false);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const { userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const navigate = useNavigate();
  const ref = useRef(null);

  async function deleteNote() {
    try {
      await axios.delete(`${notesApiUrl}${selectedNote.id}/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Note deleted");
      addToMessages("note deleted");
      closeModal();
      await getNotesDataFromApi();
    } catch (error) {
      console.log(`Error deleting note: ${error.message}`);
      addToMessages("error deleting note");
    }
  }

  function handleClickOutside() {
    closeModal();
  }

  useClickOutside(ref, handleClickOutside);

  function handleNewFolderFormSubmitInModal(title) {
    if (!title || title.trim() === "") {
      addToMessages("please enter a folder title");
    } else {
      setShowNewFolderForm(false);
      createFolder(title);
    }
  }

  function handleEditBtnClick() {
    navigate("/edit", { state: { selectedNote: selectedNote } });
  }

  return (
    <section id="note-detail-modal-container">
      {!showFolderOptions ? (
        // Display note detail
        <div id="note-detail-modal-content" ref={ref}>
          <div id="note-detail-modal-text">{selectedNote.text}</div>

          <div id="note-detail-modal-tools-container">
            <Button name="Back" icon={faArrowLeft} onClick={closeModal} />
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
        <div id="note-detail-modal-content" ref={ref}>
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
              closeModal={closeModal}
              folders={folders}
            />

            {/* New folder form */}
            {showNewFolderForm && (
              <NewFolderForm
                initialFolderName=""
                handleNewFolderFormSubmit={handleNewFolderFormSubmitInModal}
                handleNewFolderFormCancel={() => setShowNewFolderForm(false)}
              />
            )}

            {/* Other folders */}
            {folders.map((folder) => (
              <FolderOptionItem
                key={folder.id}
                id={folder.id}
                title={folder.title}
                colour={folder.colour}
                selectedNote={selectedNote}
                getNotesDataFromApi={getNotesDataFromApi}
                closeModal={closeModal}
                folders={folders}
              />
            ))}

            {/* Btn to show New Folder Form */}
            {!showNewFolderForm && (
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
            <Button name="Close" icon={faXmark} onClick={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
}
