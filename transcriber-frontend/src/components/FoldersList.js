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
import NotesList from "./NotesList.js";

// -- MAIN FUNCTION --

export default function FoldersList({
  folders,
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
  handleUpdateFolderFormSubmit,
  findFolderByID,
  notes,
}) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [foldersWithOpenToolList, setFoldersWithOpenToolList] = useState([]);
  const [foldersWithEditTitle, setFoldersWithEditTitle] = useState([]);
  const [showNotesInFolder, setShowNotesInFolder] = useState("");
  const [notesInCurrentFolder, setNotesInCurrentFolder] = useState([]);

  function toggleDetailModal() {
    setIsDetailModalOpen(!isDetailModalOpen);
  }

  function findNoteByID(id) {
    return notes.find((note) => note.id === id);
  }

  function handleFolderClick(id) {
    // Find folder with 'id'
    const selectedFolder = findFolderByID(id);
    // Get folder.notes array
    const { notes: folderNoteIDs } = selectedFolder;

    const notesInFolder = folderNoteIDs.map((noteID) => {
      return findNoteByID(noteID);
    });

    setNotesInCurrentFolder(notesInFolder);

    if (showNotesInFolder === id) {
      setShowNotesInFolder("");
    } else {
      setShowNotesInFolder(id);
    }
  }

  function handleFolderOptionsClick(id) {
    if (foldersWithOpenToolList === id) {
      setFoldersWithOpenToolList("");
    } else {
      setFoldersWithOpenToolList(id);
    }
  }

  function handleFolderEditClick(id) {
    setFoldersWithEditTitle(id);
  }

  function handleFolderDeleteClick(id) {
    deleteFolder(id);
  }

  function handleFolderEditCancelBtnClick() {
    setFoldersWithEditTitle("");
    setFoldersWithOpenToolList("");
  }

  function handleNewFolderFormSubmit(folderName) {
    const newFolder = assembleFolder(folderName);
    saveFolder(newFolder);
  }

  return (
    // refactor into <ListItem /> components
    // <main className="list-page-main">
    <>
      {folders.map((folder) => (
        <>
          <div key={folder.id} id={folder.id} className="list-page-item">
            {/* Replace normal div with a text input form when user clicks on edit icon */}
            {foldersWithEditTitle.includes(folder.id) ? (
              <NewFolderForm
                initialFolderName={folder.text}
                assembleFolder={assembleFolder}
                saveFolder={saveFolder}
                cancelNewFolderForm={handleFolderEditCancelBtnClick}
                selectedFolderName={folder.text}
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
                  <p>{folder.text}</p>
                </div>

                <div className="folder-toolbar">
                  {/* Display extra tools when user clicks on ellipsis */}
                  {foldersWithOpenToolList.includes(folder.id) && (
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
                  <div className="item-tools">
                    <div onClick={() => handleFolderOptionsClick(folder.id)}>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {showNotesInFolder.includes(folder.id) &&
            (() => {
              const isEmptyFolder = !notesInCurrentFolder.length;

              if (isEmptyFolder) {
                return (
                  <section className="notes-in-folder-dropdown">
                    <div className="list-page-item">
                      <div className="item-text">
                        <p>
                          <em> - empty folder -</em>
                        </p>
                      </div>
                    </div>
                  </section>
                );
              } else {
                return (
                  <section className="notes-in-folder-dropdown">
                    <NotesList
                      notes={notesInCurrentFolder}
                      selectNote={selectNote}
                      selectedNote={selectedNote}
                      deleteNote={deleteNote}
                      openEditPage={openEditPage}
                      isColourBlock={false}
                      // showNewFolderForm={showNewFolderForm}
                      displayPageChoice={displayPageChoice}
                    />
                  </section>
                );
              }
            })()}
        </>
      ))}

      {/* CREATE NEW FOLDER FORM */}

      {showNewFolderForm && (
        <div className="list-page-item">
          <NewFolderForm
            initialFolderName=""
            assembleFolder={assembleFolder}
            saveFolder={saveFolder}
            cancelNewFolderForm={cancelNewFolderForm}
            handleFolderFormSubmit={handleNewFolderFormSubmit}
          />
        </div>
      )}
    </>
  );
}
