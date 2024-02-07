import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { UserMessagesContext } from "./context/UserMessagesContext";

import { Routes, Route } from "react-router-dom";
import axios from "axios";
import transcriberAxios from "./config/axiosConfig";

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
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { messages, addToMessages } = useContext(UserMessagesContext);

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

  async function getAllDataFromApi() {
    await getNotesDataFromApi();
    await getFoldersDataFromApi();
  }

  // Get data form the API when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      // Only show the loader spinners on log in
      setIsLoadingNotes(true);
      setIsLoadingFolders(true);
      getNotesDataFromApi();
      getFoldersDataFromApi();
    } else {
      // Clear the notes and folders state when user logs out
      setNotes([]);
      setFolders([]);
    }
  }, [isLoggedIn]);

  // -- EVENT HANDLERS --

  function handleNoteItemClick(id) {
    setShowNoteDetailModal(true);
    setSelectedNoteID(id);
  }

  function modalBackBtnClick() {
    setShowNoteDetailModal(false);
  }

  // -- CRUD FUNCTIONS --

  // TODO: refactor into separate functions
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
            <Home folders={folders} getNotesDataFromApi={getNotesDataFromApi} />
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
              getAllDataFromApi={getAllDataFromApi}
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
