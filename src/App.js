import { useState, useContext, useEffect, useCallback } from "react";
import { UserContext } from "./context/UserContext";
import { UserMessagesContext } from "./context/UserMessagesContext";

import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home.js";
import Inbox from "./pages/Inbox";
import Folders from "./pages/Folders";
import Search from "./pages/Search";
import Edit from "./pages/Edit";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import NoPage from "./pages/NoPage";
import NoteDetailModal from "./components/NoteDetailModal";
import UserMessages from "./components/UserMessages.js";
import { generateRandomColour } from "./utils/utils";
import { notesApiUrl, foldersApiUrl } from "./constants/apiConstants";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [showNoteDetailModal, setShowNoteDetailModal] = useState(false);
  const [selectedNoteID, setSelectedNoteID] = useState(0);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);
  const [noteStoreForLoggedOutUsers, setNoteStoreForLoggedOutUsers] =
    useState("");
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { messages, addToMessages } = useContext(UserMessagesContext);

  // -- DATA FETCHING FUNCTIONS --

  async function getNotesDataFromApi() {
    try {
      const response = await axios.get(notesApiUrl, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes data from the API:", error.message);
    } finally {
      // note: isLoadingNotes is set to 'true' only when user first logs in
      setIsLoadingNotes(false);
    }
  }

  async function getFoldersDataFromApi() {
    try {
      const response = await axios.get(foldersApiUrl, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders data from the API:", error.message);
    } finally {
      // note: isLoadingFolders is set to 'true' only when user first logs in
      setIsLoadingFolders(false);
    }
  }

  // Memoize the data fetching functions to be used in the useEffect below
  const memoizedGetNotesDataFromApi = useCallback(getNotesDataFromApi, [
    userToken,
  ]);
  const memoizedGetFoldersDataFromApi = useCallback(getFoldersDataFromApi, [
    userToken,
  ]);

  // Get data form the API when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      // Only show the loader spinners on log in
      setIsLoadingNotes(true);
      setIsLoadingFolders(true);
      memoizedGetNotesDataFromApi();
      memoizedGetFoldersDataFromApi();
    } else {
      // Clear the notes and folders state when user logs out
      setNotes([]);
      setFolders([]);
    }
  }, [isLoggedIn, memoizedGetNotesDataFromApi, memoizedGetFoldersDataFromApi]);

  // -- EVENT HANDLERS --

  function handleNoteItemClick(id) {
    setShowNoteDetailModal(true);
    setSelectedNoteID(id);
  }

  function modalBackBtnClick() {
    setShowNoteDetailModal(false);
  }

  // -- CRUD FUNCTIONS --

  async function createFolder(title) {
    const colour = generateRandomColour();
    const newFolder = { title: title, colour: colour };
    try {
      const response = await axios.post(foldersApiUrl, newFolder, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Folder saved:", response.data);
      addToMessages("folder saved");
      await getFoldersDataFromApi();
    } catch (error) {
      alert(`Error saving folder: ${error.message}`);
    }
  }

  // -- RENDER ELEMENTS --

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              folders={folders}
              getNotesDataFromApi={getNotesDataFromApi}
              noteStoreForLoggedOutUsers={noteStoreForLoggedOutUsers}
              setNoteStoreForLoggedOutUsers={setNoteStoreForLoggedOutUsers}
            />
          }
        />
        <Route
          path="/inbox"
          element={
            <Inbox
              notes={notes}
              folders={folders}
              handleNoteItemClick={handleNoteItemClick}
              isLoadingNotes={isLoadingNotes}
            />
          }
        />
        <Route
          path="/folders"
          element={
            <Folders
              notes={notes}
              folders={folders}
              handleNoteItemClick={handleNoteItemClick}
              createFolder={createFolder}
              getNotesDataFromApi={getNotesDataFromApi}
              getFoldersDataFromApi={getFoldersDataFromApi}
              isLoadingFolders={isLoadingFolders}
            />
          }
        />
        <Route
          path="/search"
          element={
            <Search
              notes={notes}
              folders={folders}
              handleNoteItemClick={handleNoteItemClick}
              isLoadingNotes={isLoadingNotes}
              isLoadingFolders={isLoadingFolders}
            />
          }
        />
        <Route
          path="/edit"
          element={
            <Edit folders={folders} getNotesDataFromApi={getNotesDataFromApi} />
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>

      {showNoteDetailModal && (
        <NoteDetailModal
          notes={notes}
          folders={folders}
          selectedNoteID={selectedNoteID}
          modalBackBtnClick={modalBackBtnClick}
          setShowNoteDetailModal={setShowNoteDetailModal}
          createFolder={createFolder}
          getNotesDataFromApi={getNotesDataFromApi}
        />
      )}

      {messages && <UserMessages messages={messages} />}
    </>
  );
}
