import { useState, useEffect } from "react";

import axios from "axios";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
  faPlus,
  faXmark,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFolder } from "@fortawesome/free-regular-svg-icons";

import Header from "./components/Header.js";
import NotesList from "./components/NotesList.js";
import FoldersList from "./components/FoldersList.js";
import TextArea from "./components/TextArea.js";
import MainTool from "./components/MainTool.js";
import Toolbar from "./components/Toolbar.js";
import SpeechRecognition from "./components/SpeechRecognition.js";
import OpenAiApi from "./components/OpenAiApi.js";
import SignUpForm from "./components/SignUpForm.js";
import LogInForm from "./components/LogInForm.js";
import LogOutBtn from "./components/LogOutBtn.js";
import SearchBar from "./components/SearchBar.js";

import { generateRandomColour } from "./utils/utils.js";
import {
  capitalise,
  capitaliseNewSentence,
  punctuate,
} from "./utils/speechRecognitionUtils.js";

// Get user authorization token from local storage if one exists
// (so login will persist after page reloads)
const getInitialUserToken = () => {
  const tokenFromLocalStorage = localStorage.getItem("userToken");
  if (!tokenFromLocalStorage) {
    return "";
  } else {
    return tokenFromLocalStorage;
  }
};

// -- APP --

export default function App() {
  const [notes, setNotes] = useState([]);
  // const [notes, setNotes] = useState(getInitialNotesData);
  const [folders, setFolders] = useState([]);
  // const [folders, setFolders] = useState(getInitialFoldersData);
  const [textAreaInput, setTextAreaInput] = useState("");
  const [selectedNote, setSelectedNote] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [displayPageChoice, setDisplayPageChoice] = useState("create");
  const [targetFolder, setTargetFolder] = useState(null);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [userToken, setUserToken] = useState(getInitialUserToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");

  // Sync the local storage copy of the user token when it changes in state
  // useEffect(() => {
  //   localStorage.setItem("userToken", userToken);
  // }, [userToken]);

  // TODO: rename to 'saveUserTokenToState'
  function saveUserToken(token) {
    setUserToken(token);
  }

  function saveTokenToLocalStorage(token) {
    localStorage.setItem("userToken", token);
  }

  console.log({ userToken });

  useEffect(() => {
    setIsLoggedIn(userToken ? true : false);
  }, []);

  console.log({ isLoggedIn });

  const NOTES_API_URL =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/notes/";
  const FOLDERS_API_URL =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/folders/";

  // Get data from API on page load

  async function getInitialNotesDataFromApi() {
    try {
      const response = await axios.get(NOTES_API_URL, {
        // TODO: reformat header into varaible or set global axios header
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const notesData = await response.data;
      console.log("API CALLED: get notes");
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes data from the API:", error.message);
    }
  }

  async function getInitialFoldersDataFromApi() {
    try {
      const response = await axios.get(FOLDERS_API_URL, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      const foldersData = await response.data;
      console.log("API CALLED: get folders");
      setFolders(foldersData);
    } catch (error) {
      console.error("Error fetching folders data from the API:", error.message);
    }
  }

  useEffect(() => {
    if (userToken) {
      getInitialNotesDataFromApi();
      getInitialFoldersDataFromApi();
    } else {
      return;
    }
  }, []);

  // Speech recognition handler

  function setTextFromSpeechRecognition(transcript) {
    // Add punctuation to replace the voice commands
    let punctuatedTranscript = punctuate(transcript);

    // If it's an empty note, start with a capital letter
    if (textAreaInput === "") {
      let capitalisedTranscript = capitalise(punctuatedTranscript);
      setTextAreaInput(
        (prevTextAreaInput) => prevTextAreaInput + capitalisedTranscript
      );
    } else {
      // **THIS FUNCTIONALITY NOT WORKING YET**
      // Else if previous text in is the text area, get the last character
      let lastCharacter = textAreaInput.charAt(textAreaInput.length - 1);
      console.log(`last char:${lastCharacter}`);
      const capitaliseAfterThese = [".", "!", "?"];
      // If the last character signals a new sentence, add a capital letter
      if (capitaliseAfterThese.includes(lastCharacter)) {
        let newSentence = capitaliseNewSentence(punctuatedTranscript);
        setTextAreaInput(
          (prevTextAreaInput) => prevTextAreaInput + newSentence
        );
      } else {
        setTextAreaInput(
          (prevTextAreaInput) => prevTextAreaInput + punctuatedTranscript
        );
      }
    }
  }

  // -- CRUD FUNCTIONS --

  function assembleNote(text) {
    const newNote = { text: text, folder_id: targetFolder };
    return newNote;
  }

  function assembleFolder(title) {
    const colour = generateRandomColour();
    const newFolder = { title: title, colour: colour };
    return newFolder;
  }

  async function saveNote(newNote) {
    try {
      const response = await axios.post(NOTES_API_URL, newNote, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Note saved:", response.data);
      getInitialNotesDataFromApi();
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  }

  async function saveFolder(newFolder) {
    try {
      const response = await axios.post(FOLDERS_API_URL, newFolder, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Folder saved:", response.data);
      getInitialFoldersDataFromApi();
      cancelNewFolderForm();
    } catch (error) {
      console.error("Error saving folder:", error.message);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(NOTES_API_URL + `${id}/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Note deleted successfully.");
      getInitialNotesDataFromApi();
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  }

  async function deleteFolder(id) {
    try {
      await axios.delete(FOLDERS_API_URL + `${id}/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Folder deleted successfully.");
      getInitialFoldersDataFromApi();
    } catch (error) {
      console.error("Error deleting folder:", error.message);
    }
  }

  // DISPLAY FUNCTIONS

  function showNotesList() {
    setDisplayPageChoice("inbox");
  }

  function showFoldersList() {
    setDisplayPageChoice("folders");
  }

  function openEditPage() {
    setTextAreaInput(selectedNote.text);
    setDisplayPageChoice("update");
  }

  function handleShowNewFolderBtnClick() {
    setShowNewFolderForm(true);
  }

  function cancelNewFolderForm() {
    setShowNewFolderForm(false);
  }

  function showLogInForm() {
    setDisplayPageChoice("login");
  }

  function showSignUpForm() {
    setDisplayPageChoice("signup");
  }

  // UTILITY FUNCTIONS

  function clearTextArea() {
    setTextAreaInput("");
  }

  function selectNote(id, text, folderId) {
    setSelectedNote({ id, text, folderId });
  }

  function findFolderByID(id) {
    return folders.find((folder) => folder.id === id);
  }

  // EVENT HANDLERS

  function handleTextAreaUserInput(text) {
    setTextAreaInput(text);
  }

  function handleMicrophoneClick() {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  }

  function handleNewNoteClick() {
    setDisplayPageChoice("create");
    setTargetFolder(null);
    clearTextArea();
  }

  function handleSaveNoteBtnClick() {
    const newNote = assembleNote(textAreaInput);
    saveNote(newNote);
    getInitialNotesDataFromApi();
    if (targetFolder === null) {
      showNotesList();
    } else {
      // Navigate to folders list is note has been created into a folder
      showFoldersList();
    }
  }

  function handleCreateNewNoteinFolderClick(folderId) {
    setTargetFolder(FOLDERS_API_URL + `${folderId}/`);
    setDisplayPageChoice("create");
    clearTextArea();
  }

  async function handleUpdateNoteBtnClick() {
    // Assemble the updated note
    const id = selectedNote.id;
    const updatedNote = { text: textAreaInput };
    try {
      await axios.patch(NOTES_API_URL + `${id}/`, updatedNote, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // TODO: check if the line below actually checks the request status
      console.log("Note updated successfully.");
      getInitialNotesDataFromApi();
      showNotesList();
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  }

  async function handleAddNoteToFolder(targetFolderId) {
    const noteId = selectedNote.id;
    const updatedNote = { folder_id: FOLDERS_API_URL + `${targetFolderId}/` };
    try {
      await axios.patch(NOTES_API_URL + `${noteId}/`, updatedNote, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // TODO: check if the line below actually checks the request status
      console.log("Note updated successfully.");
      getInitialNotesDataFromApi();
      showFoldersList();
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  }

  function handleNewFolderFormSubmit(title) {
    const newFolder = assembleFolder(title);
    saveFolder(newFolder);
  }

  async function handleUpdateFolderFormSubmit(name, id) {
    const updatedFolder = { title: name };
    try {
      await axios.patch(FOLDERS_API_URL + `${id}/`, updatedFolder, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      // TODO: check if the line below actually checks the request status
      console.log("Folder updated successfully.");
      getInitialFoldersDataFromApi();
    } catch (error) {
      console.error("Error updating folder:", error.message);
    }
  }

  function handleSearchInputChange(event) {
    setSearchTerms(event.target.value);
  }

  // -- RENDER ELEMENTS --

  if (displayPageChoice === "create") {
    return (
      // Display transcriber
      <>
        <Header
          title="transcriber"
          showUserIcon={true}
          showNavIcon={true}
          navIcon={faListUl}
          onNavIconClick={showNotesList}
          isLoggedIn={isLoggedIn}
          showLogInForm={showLogInForm}
          showSignUpForm={showSignUpForm}
          userToken={userToken}
          saveUserToken={saveUserToken}
        />
        <TextArea
          handleTextAreaUserInput={handleTextAreaUserInput}
          textAreaInput={textAreaInput}
          isRecording={isRecording}
        />
        <SpeechRecognition
          isRecording={isRecording}
          setTextFromSpeechRecognition={setTextFromSpeechRecognition}
          textAreaInput={textAreaInput}
        />
        <MainTool
          icon={faMicrophone}
          onMainToolClick={handleMicrophoneClick}
          isRecording={isRecording}
        />
        <OpenAiApi
          textAreaInput={textAreaInput}
          handleTextAreaUserInput={handleTextAreaUserInput}
        />
        <Toolbar
          tool1Name="Save"
          tool1Icon={faArrowUpFromBracket}
          tool1OnClick={handleSaveNoteBtnClick}
          tool2Name="Clear"
          tool2Icon={faTrashCan}
          tool2OnClick={clearTextArea}
        />
      </>
    );
  } else if (displayPageChoice === "login") {
    return (
      <>
        <Header
          title="transcriber"
          showUserIcon={true}
          showNavIcon={true}
          navIcon={faListUl}
          onNavIconClick={showNotesList}
          isLoggedIn={isLoggedIn}
          showLogInForm={showLogInForm}
          showSignUpForm={showSignUpForm}
        />
        <LogInForm
          saveUserToken={saveUserToken}
          saveTokenToLocalStorage={saveTokenToLocalStorage}
          getInitialNotesDataFromApi={getInitialNotesDataFromApi}
          getInitialFoldersDataFromApi={getInitialFoldersDataFromApi}
          setDisplayPageChoice={setDisplayPageChoice}
        />
      </>
    );
  } else if (displayPageChoice === "signup") {
    return (
      <>
        <Header
          title="transcriber"
          showUserIcon={true}
          showNavIcon={true}
          navIcon={faListUl}
          onNavIconClick={showNotesList}
          isLoggedIn={isLoggedIn}
          showLogInForm={showLogInForm}
          showSignUpForm={showSignUpForm}
        />
        <SignUpForm
          saveUserToken={saveUserToken}
          saveTokenToLocalStorage={saveTokenToLocalStorage}
          getInitialNotesDataFromApi={getInitialNotesDataFromApi}
          getInitialFoldersDataFromApi={getInitialFoldersDataFromApi}
          setDisplayPageChoice={setDisplayPageChoice}
        />
      </>
    );
  } else if (displayPageChoice === "inbox") {
    // Display notes inbox
    return (
      <>
        <Header
          title="inbox"
          showNavIcon={true}
          navIcon={faFolder}
          onNavIconClick={showFoldersList}
        />
        <main className="list-page-main">
          <SearchBar
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            handleSearchInputChange={handleSearchInputChange}
          />
          <NotesList
            notes={notes}
            folders={folders}
            selectNote={selectNote}
            selectedNote={selectedNote}
            deleteNote={deleteNote}
            openEditPage={openEditPage}
            handleAddNoteToFolder={handleAddNoteToFolder}
            folderChoice={null}
            handleNewFolderFormSubmit={handleNewFolderFormSubmit}
            cancelNewFolderForm={cancelNewFolderForm}
            handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
            showNewFolderForm={showNewFolderForm}
            FOLDERS_API_URL={FOLDERS_API_URL}
            searchTerms={searchTerms}
          />
          <MainTool icon={faPlus} onMainToolClick={handleNewNoteClick} />
        </main>
      </>
    );
  } else if (displayPageChoice === "update") {
    // Display update page
    return (
      <>
        <Header title="edit" showNavIcon={false} />
        <TextArea
          handleTextAreaUserInput={handleTextAreaUserInput}
          textAreaInput={textAreaInput}
          isRecording={isRecording}
        />
        <MainTool
          icon={faMicrophone}
          onMainToolClick={handleMicrophoneClick}
          isRecording={isRecording}
        />
        <SpeechRecognition
          isRecording={isRecording}
          setTextFromSpeechRecognition={setTextFromSpeechRecognition}
          textAreaInput={textAreaInput}
        />
        <OpenAiApi
          textAreaInput={textAreaInput}
          handleTextAreaUserInput={handleTextAreaUserInput}
        />
        <Toolbar
          tool1Name="Update"
          tool1Icon={faArrowUpFromBracket}
          tool1OnClick={handleUpdateNoteBtnClick}
          tool2Name="Cancel"
          tool2Icon={faXmark}
          tool2OnClick={showNotesList}
        />
      </>
    );
  } else {
    // Display folders page
    return (
      <>
        <Header
          title="folders"
          showNavIcon={true}
          navIcon={faListUl}
          onNavIconClick={showNotesList}
        />
        <main className="list-page-main">
          <SearchBar
            searchTerms={searchTerms}
            setSearchTerms={setSearchTerms}
            handleSearchInputChange={handleSearchInputChange}
          />
          <FoldersList
            folders={folders}
            notes={notes}
            selectNote={selectNote}
            selectedNote={selectedNote}
            deleteNote={deleteNote}
            openEditPage={openEditPage}
            displayPageChoice={displayPageChoice}
            isColourBlock={true}
            showNewFolderForm={showNewFolderForm}
            saveFolder={saveFolder}
            assembleFolder={assembleFolder}
            cancelNewFolderForm={cancelNewFolderForm}
            deleteFolder={deleteFolder}
            handleUpdateFolderFormSubmit={handleUpdateFolderFormSubmit}
            findFolderByID={findFolderByID}
            handleAddNoteToFolder={handleAddNoteToFolder}
            handleNewFolderFormSubmit={handleNewFolderFormSubmit}
            handleCreateNewNoteinFolderClick={handleCreateNewNoteinFolderClick}
            handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
            FOLDERS_API_URL={FOLDERS_API_URL}
            searchTerms={searchTerms}
          />
        </main>
      </>
    );
  }
}
