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
import UserMessages from "./components/UserMessages.js";
import { generateRandomColour } from "./utils/utils";
import { notesApiUrl, foldersApiUrl } from "./constants/apiConstants";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isLoadingFolders, setIsLoadingFolders] = useState(false);
  const [noteStoreForLoggedOutUsers, setNoteStoreForLoggedOutUsers] =
    useState("");
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { messages, addToMessages } = useContext(UserMessagesContext);

  // -- DATA FETCHING FUNCTIONS --

  /**
   * Fetches notes data from the API and stores it in state.
   */
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

  /**
   * Fetches folders data from the API and stores it in state.
   */
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

  /**
   * Fetches notes and folders data from the API when the user logs in,
   * and clears the data when the user logs out.
   */
  useEffect(() => {
    if (isLoggedIn && userToken) {
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
  }, [
    isLoggedIn,
    userToken,
    memoizedGetNotesDataFromApi,
    memoizedGetFoldersDataFromApi,
  ]);

  // -- CRUD FUNCTIONS --

  /**
   * Creates a new folder with a user-supplied title and an automatically generated random color.
   *
   * Note:
   * The function is in the App() so it can be shared with the <NoteDetailModal/> via the pages:
   * Inbox, Folders and Search.
   */
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
              createFolder={createFolder}
              isLoadingNotes={isLoadingNotes}
              getNotesDataFromApi={getNotesDataFromApi}
            />
          }
        />
        <Route
          path="/folders"
          element={
            <Folders
              notes={notes}
              folders={folders}
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
              createFolder={createFolder}
              isLoadingNotes={isLoadingNotes}
              isLoadingFolders={isLoadingFolders}
              getNotesDataFromApi={getNotesDataFromApi}
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

      {messages && <UserMessages messages={messages} />}
    </>
  );
}
