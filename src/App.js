import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

import { Routes, Route } from "react-router-dom";
import axios from "axios";
import transcriberAxios from "./config/axiosConfig";

import Transcriber from "./pages/Transcriber";
import Inbox from "./pages/Inbox";
import Folders from "./pages/Folders";
import Search from "./pages/Search";
import Edit from "./pages/Edit";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import NoPage from "./pages/NoPage";

export default function TranscriberApp() {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const NOTES_API_URL =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/notes/";
  const FOLDERS_API_URL =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/folders/";

  async function getNotesDataFromApi() {
    try {
      const response = await axios.get(NOTES_API_URL, {
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
      const response = await axios.get(FOLDERS_API_URL, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders data from the API:", error.message);
    }
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

  return (
    <>
      <Routes>
        <Route path="/" element={<Transcriber />} />
        <Route path="/inbox" element={<Inbox notes={notes} />} />
        <Route
          path="/folders"
          element={<Folders notes={notes} folders={folders} />}
        />
        <Route
          path="/search"
          element={<Search notes={notes} folders={folders} />}
        />
        <Route path="/edit" element={<Edit />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </>
  );
}
