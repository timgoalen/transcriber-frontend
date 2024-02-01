import { useState, Fragment, useEffect, useContext } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";
import Header from "../components/header/Header.js";
import Create from "../components/header/Create.js";
import Inbox from "../components/header/Inbox.js";
import Search from "../components/header/Search.js";
import FolderListItem from "../components/FolderListItem";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import NewFolderForm from "../components/NewFolderForm.js";
import MainTool from "../components/MainTool.js";
import { getNotesInFolder } from "../utils/utils.js";

export default function Folders({
  notes,
  folders,
  handleNoteItemClick,
  createFolder,
  getAllDataFromApi,
  getFoldersDataFromApi,
}) {
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [openToolList, setOpenToolList] = useState(0);
  const [editFolderTitle, setEditFolderTitle] = useState(0);
  const { isLoggedIn, userToken } = useContext(UserContext);

  // TODO: replace with axios globals
  const foldersApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/folders/";

  // TODO: explain why this is needed
  const passedData = useLocation();
  useEffect(() => {
    if (passedData.state) {
      const { savedToFolderID } = passedData.state;
      setShowNotesInFolder(savedToFolderID);
    }
  }, []);

  async function updateFolderTitle(title, id) {
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
      await getFoldersDataFromApi();
    } catch (error) {
      alert("Error updating folder:", error.message);
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
    setShowNewFolderForm(false);
    await createFolder(title);
  }

  function handleFolderOptionsClick(id) {
    openToolList === id ? setOpenToolList(0) : setOpenToolList(id);
  }

  function handleFolderEditClick(id) {
    setEditFolderTitle(id);
  }

  // -- RENDER ELEMENTS --

  return (
    <>
      <Header pageTitle="folders">
        <Create />
        <Search />
        <Inbox />
      </Header>

      <main className="list-page-main">
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
            onClick={() => setShowNewFolderForm(true)}
            icon={faPlus}
          />
        )}

        {folders.length === 0 && (
          <EmptyPlaceholderGraphics
            primaryColour="#268cf2"
            secondaryColour="#f28c26"
          />
        )}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
