import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { generateRandomColour } from "./utils/utils";

export default function App() {
  const { isLoggedIn, userToken } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [showNoteDetailModal, setShowNoteDetailModal] = useState(false);
  const [selectedNoteID, setSelectedNoteID] = useState(0);
  const navigate = useNavigate();
  // TODO: replace with axios globals
  const notesApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/notes/";
  const foldersApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/folders/";

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
    }
  }

  async function getAllDataFromApi() {
    await getNotesDataFromApi();
    await getFoldersDataFromApi();
  }

  // Get data form the API when user logs in
  useEffect(() => {
    if (isLoggedIn) {
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
          element={<Home getNotesDataFromApi={getNotesDataFromApi} />}
        />
        <Route
          path="/inbox"
          element={
            <Inbox
              notes={notes}
              folders={folders}
              handleNoteItemClick={handleNoteItemClick}
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
          element={<Edit getNotesDataFromApi={getNotesDataFromApi} />}
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
    </>
  );
}
