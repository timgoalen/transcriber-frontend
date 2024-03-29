import { useState, Fragment, useContext, useEffect } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/header/Header.js";
import FolderListItem from "../components/FolderListItem";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import NewFolderForm from "../components/NewFolderForm.js";
import MainTool from "../components/MainTool.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import LogInSignUpPrompt from "../components/LogInSignUpPrompt.js";
import UserMessages from "../components/UserMessages.js";
import NoteDetailModal from "../components/NoteDetailModal.js";
import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import useNoteDetailModal from "../hooks/useNoteDetailModal.js";
import usePrevLocationNotification from "../hooks/usePrevLocationNotification.js";
import { getNotesInFolder } from "../utils/utils.js";
import { foldersApiUrl } from "../constants/apiConstants";

/**
 * Component for displaying the list of folders.
 */
export default function Folders({
  notes,
  folders,
  createFolder,
  getNotesDataFromApi,
  getFoldersDataFromApi,
  isLoadingFolders,
}) {
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [openToolList, setOpenToolList] = useState(0);
  const [editFolderTitle, setEditFolderTitle] = useState(0);
  const [showLogInSignUpPrompt, setShowLogInSignUpPrompt] = useState(false);
  const [messageFromPrevLocation, setMessageFromPrevLocation] = useState("");
  const [selectedNote, setSelectedNote] = useState({});
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const { isModalOpen, openModal, closeModal } = useNoteDetailModal();
  const passedData = useLocation();
  const passedMessage = passedData.state?.message;
  usePrevLocationNotification(passedMessage, setMessageFromPrevLocation);

  // If redirected after a create-note-in-folder action, open the containing folder
  useEffect(() => {
    if (passedData?.state?.savedToFolderID) {
      const { savedToFolderID } = passedData.state;
      setShowNotesInFolder(savedToFolderID);
    }
  }, [passedData?.state]);

  // -- CRUD FUNCTIONS --

  /**
   * Updates the title of a folder.
   */
  async function updateFolderTitle(title, id) {
    // Validate empty titles
    if (!title || title.trim() === "") {
      addToMessages("please enter a folder title");
      return;
    }

    const updatedFolder = { title: title };
    setEditFolderTitle(0);
    setOpenToolList(0);
    try {
      const response = await axios.patch(
        `${foldersApiUrl}${id}/`,
        updatedFolder,
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.log("Folder updated:", response.data);
      addToMessages("folder title updated");
      await getFoldersDataFromApi();
    } catch (error) {
      alert("Error updating folder:", error.message);
      addToMessages("error updating folder");
    }
  }

  // -- CLICK HANDLERS --

  function handleFolderClick(id) {
    // Show/hide notes list
    showNotesInFolder === id
      ? setShowNotesInFolder(0)
      : setShowNotesInFolder(id);
  }

  function handleNoteItemClick(note) {
    openModal();
    setSelectedNote(note);
  }

  function handleNewFolderFormCancel() {
    setShowNewFolderForm(false);
  }

  function handleUpdateFolderCancel() {
    setEditFolderTitle(0);
    setOpenToolList(0);
  }

  /**
   * Submits the new folder form and calls the `createFolder` function.
   */
  async function handleNewFolderFormSubmit(title) {
    if (title.trim() === "") {
      addToMessages("please enter a folder title");
    } else {
      setShowNewFolderForm(false);
      await createFolder(title);
    }
  }

  function handleFolderOptionsClick(id) {
    openToolList === id ? setOpenToolList(0) : setOpenToolList(id);
  }

  function handleFolderEditClick(id) {
    setEditFolderTitle(id);
  }

  function handleMainToolClick() {
    if (isLoggedIn) {
      setShowNewFolderForm(true);
    } else {
      setShowLogInSignUpPrompt(true);
    }
  }

  // -- RENDER ELEMENTS --

  return (
    <>
      <Header pageTitle="folders" />

      <main>
        <section className="list-page-main">
          {/* Alternate between showing the main "+" button and the form to create a folder */}
          {showNewFolderForm ? (
            <NewFolderForm
              handleNewFolderFormCancel={handleNewFolderFormCancel}
              handleNewFolderFormSubmit={handleNewFolderFormSubmit}
              initialFolderName=""
              initialFolderID={null}
            />
          ) : (
            <MainTool
              className="main-tool-blue"
              ariaLabel="New folder"
              onClick={handleMainToolClick}
              icon={faPlus}
            />
          )}

          {isLoadingFolders ? (
            <LoadingSpinner />
          ) : (
            <>
              {folders.map((folder) => (
                <Fragment key={folder.id}>
                  {/* Show a form to edit the folder title if selected */}
                  {editFolderTitle === folder.id ? (
                    <NewFolderForm
                      handleNewFolderFormCancel={handleUpdateFolderCancel}
                      setShowNewFolderForm={setShowNewFolderForm}
                      handleNewFolderFormSubmit={updateFolderTitle}
                      initialFolderName={folder.title}
                      initialFolderID={folder.id}
                    />
                  ) : (
                    <FolderListItem
                      id={folder.id}
                      title={folder.title}
                      colour={folder.colour}
                      handleFolderClick={handleFolderClick}
                      handleFolderOptionsClick={handleFolderOptionsClick}
                      openToolList={openToolList}
                      handleFolderEditClick={handleFolderEditClick}
                      getNotesDataFromApi={getNotesDataFromApi}
                      getFoldersDataFromApi={getFoldersDataFromApi}
                      showTools={true}
                    />
                  )}

                  {/* Show the notes contained within the folder when the user clicks */}
                  {showNotesInFolder === folder.id && (
                    <NotesInFolderDropdown
                      folders={folders}
                      notesInFolder={getNotesInFolder(notes, folder.id)}
                      handleNoteItemClick={handleNoteItemClick}
                      parentFolderID={folder.id}
                    />
                  )}
                </Fragment>
              ))}

              {/* Show a placeholder when no saved folders exist */}
              {folders.length === 0 && (
                <EmptyPlaceholderGraphics
                  primaryColour="#268cf2"
                  secondaryColour="#f28c26"
                />
              )}
            </>
          )}

          {/* Only allow logged in users to save a folder */}
          {showLogInSignUpPrompt && (
            <LogInSignUpPrompt
              userAttempedAction="create a folder"
              setShowLogInSignUpPrompt={setShowLogInSignUpPrompt}
            />
          )}
        </section>

        {isModalOpen && (
          <NoteDetailModal
            selectedNote={selectedNote}
            folders={folders}
            closeModal={closeModal}
            createFolder={createFolder}
            getNotesDataFromApi={getNotesDataFromApi}
          />
        )}

        {messageFromPrevLocation && (
          <UserMessages messages={messageFromPrevLocation} />
        )}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
