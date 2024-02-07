import { useState, Fragment, useEffect, useContext } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import Header from "../components/header/Header.js";
import CreateNav from "../components/header/CreateNav.js";
import InboxNav from "../components/header/InboxNav.js";
import SearchNav from "../components/header/SearchNav.js";
import FolderListItem from "../components/FolderListItem";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import NewFolderForm from "../components/NewFolderForm.js";
import MainTool from "../components/MainTool.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import LogInSignUpPrompt from "../components/LogInSignUpPrompt.js";
import { getNotesInFolder } from "../utils/utils.js";
import { foldersApiUrl } from "../constants/apiConstants";

export default function Folders({
  notes,
  folders,
  handleNoteItemClick,
  createFolder,
  getAllDataFromApi,
  getFoldersDataFromApi,
  isLoadingFolders,
}) {
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [openToolList, setOpenToolList] = useState(0);
  const [editFolderTitle, setEditFolderTitle] = useState(0);
  const [showLogInSignUpPrompt, setShowLogInSignUpPrompt] = useState(false);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const passedData = useLocation();

  useEffect(() => {
    // Show confimation messages if received from Transcriber
    if (passedData?.state?.message) {
      const { message } = passedData.state;
      addToMessages(message);
    }
    // Open folder if note is saved to folder
    if (passedData?.state?.savedToFolderID) {
      const { savedToFolderID } = passedData.state;
      setShowNotesInFolder(savedToFolderID);
    }
  }, []);

  async function updateFolderTitle(title, id) {
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

  function handleNewFolderFormCancel() {
    setShowNewFolderForm(false);
  }

  function handleUpdateFolderCancel() {
    setEditFolderTitle(0);
    setOpenToolList(0);
  }

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
      <Header pageTitle="folders">
        <CreateNav />
        <SearchNav />
        <InboxNav />
      </Header>

      <main>
        <section className="list-page-main">
          {isLoadingFolders ? (
            <LoadingSpinner />
          ) : (
            <>
              {folders.map((folder) => (
                <Fragment key={folder.id}>
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
                      getAllDataFromApi={getAllDataFromApi}
                      showTools={true}
                    />
                  )}

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

              {folders.length === 0 && (
                <EmptyPlaceholderGraphics
                  primaryColour="#268cf2"
                  secondaryColour="#f28c26"
                />
              )}
            </>
          )}

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

          {showLogInSignUpPrompt && (
            <LogInSignUpPrompt
              userAttempedAction="create a folder"
              setShowLogInSignUpPrompt={setShowLogInSignUpPrompt}
            />
          )}
        </section>
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
