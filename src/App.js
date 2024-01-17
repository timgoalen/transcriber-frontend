import { useState, useEffect } from "react";

import axios from "axios";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
  faPlus,
  faXmark,
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

import { generateTimestamp, generateRandomColour } from "./utils/utils.js";
import {
  capitalise,
  capitaliseNewSentence,
  punctuate,
} from "./utils/speechRecognitionUtils.js";

// Get existing data from local storage

// const getInitialNotesData = () => {
//   const initialNotesData = JSON.parse(localStorage.getItem("notes"));
//   if (!initialNotesData) {
//     return [];
//   } else {
//     return initialNotesData;
//   }
// };

// const getInitialFoldersData = () => {
//   const initialFoldersData = JSON.parse(localStorage.getItem("folders"));
//   if (!initialFoldersData) {
//     return [];
//   } else {
//     return initialFoldersData;
//   }
// };

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
  const [targetFolder, setTargetFolder] = useState("inbox");
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);

  async function getInitialNotesDataFromApi() {
    // TODO: re-write as try/catch
    const response = await axios.get(
      "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/notes/"
    );
    const notesData = await response.data;
    console.log("API CALLED: get notes");
    setNotes(notesData);
  }

  async function getInitialFoldersDataFromApi() {
    // TODO: re-write as try/catch
    const response = await axios.get(
      "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/folders/"
    );
    const foldersData = await response.data;
    console.log("API CALLED: get folders");
    setFolders(foldersData);
  }

  useEffect(() => {
    getInitialNotesDataFromApi();
    getInitialFoldersDataFromApi();
  }, []);

  // Synchronize data between state & local storage

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  // useEffect(() => {
  //   localStorage.setItem("folders", JSON.stringify(folders));
  // }, [folders]);

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

  // function assembleNote(text) {
  //   const id = generateTimestamp();
  //   const newNote = { id: id, text: text, folderId: targetFolder };
  //   return newNote;
  // }

  function assembleNote(text) {
    const newNote = { text: text, folder_id: targetFolder };
    return newNote;
  }

  function assembleFolder(title) {
    // const id = generateTimestamp();
    const colour = generateRandomColour();
    const newFolder = { title: title, colour: colour };
    return newFolder;
  }

  // function saveNote(newNote) {
  //   setNotes((prevNotes) => [...prevNotes, newNote]);
  // }

  async function saveNote(newNote) {
    try {
      const response = await axios.post(
        "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/notes/",
        newNote
      );
      console.log("Note saved:", response.data);
      getInitialNotesDataFromApi();
    } catch (error) {
      console.error("Error saving note:", error.message);
    }
  }

  // function saveFolder(folderName) {
  //   setFolders((prevFolders) => [...prevFolders, folderName]);
  //   cancelNewFolderForm();
  // }

  async function saveFolder(newFolder) {
    try {
      const response = await axios.post(
        "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/folders/",
        newFolder
      );
      console.log("Folder saved:", response.data);
      getInitialFoldersDataFromApi();
    } catch (error) {
      console.error("Error saving folder:", error.message);
    }
    cancelNewFolderForm();
  }

  // function deleteNote(id) {
  //   setNotes((prevNotes) => {
  //     return prevNotes.filter((note) => note.id !== id);
  //   });
  // }

  async function deleteNote(id) {
    console.log({ id });
    try {
      await axios.delete(
        `https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/notes/${id}/`
      );
      console.log("Note deleted successfully.");
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
    // TODO: move this into click handler (handleDeleteBtnClick) in NotesList.js?
    getInitialNotesDataFromApi();
  }

  async function deleteFolder(id) {
    console.log({ id });
    try {
      await axios.delete(
        `https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/folders/${id}/`
      );
      console.log("Folder deleted successfully.");
    } catch (error) {
      console.error("Error deleting folder:", error.message);
    }
    // TODO: move this into click handler (handleDeleteBtnClick) in NotesList.js?
    getInitialFoldersDataFromApi();
  }

  // function deleteFolder(id) {
  //   setFolders((prevFolders) => {
  //     return prevFolders.filter((folder) => folder.id !== id);
  //   });
  // }

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
    setTargetFolder("inbox");
    clearTextArea();
  }

  function handleSaveNoteBtnClick() {
    const newNote = assembleNote(textAreaInput);
    saveNote(newNote);
    getInitialNotesDataFromApi();
    showNotesList();
  }

  function handleCreateNewNoteinFolderClick(folderId) {
    setTargetFolder(folderId);
    setDisplayPageChoice("create");
    clearTextArea();
  }

  // function handleUpdateNoteBtnClick() {
  //   // Assemble the updated note
  //   const id = selectedNote.id;
  //   const folderId = selectedNote.folderId;
  //   const updatedNote = { id: id, text: textAreaInput, folderId: folderId };
  //   // Delete the old version
  //   deleteNote(id);
  //   // Save the updated version (with the original timestamp ID)
  //   saveNote(updatedNote);
  //   showNotesList();
  // }

  async function handleUpdateNoteBtnClick() {
    // Assemble the updated note
    const id = selectedNote.id;
    const folderId = selectedNote.folderId;
    // const updatedNote = { id: id, text: textAreaInput, folder_id: folderId };
    // const updatedNote = { id: id, text: textAreaInput, folder_id: folderId };
    const updatedNote = { text: textAreaInput };
    try {
      await axios.patch(
        `https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/notes/${id}/`,
        updatedNote
      );
      // TODO: check if the line below actually checks the request status
      console.log("Note updated successfully.");
      // TODO: move this into click handler (handleDeleteBtnClick) in NotesList.js???
      getInitialNotesDataFromApi();
      showNotesList();
    } catch (error) {
      console.error("Error updating note:", error.message);
    }
  }

  function handleAddNoteToFolder(targetFolderId) {
    // Assemble the new note
    const { id, text } = selectedNote;
    const updatedNote = { id: id, text: text, folderId: targetFolderId };
    // Delete the old version
    deleteNote(id);
    // Save the updated version (with the original timestamp ID)
    saveNote(updatedNote);
    showFoldersList();
  }

  function handleNewFolderFormSubmit(title) {
    const newFolder = assembleFolder(title);
    saveFolder(newFolder);
  }

  // function handleUpdateFolderFormSubmit(name, id) {
  //   const selectedFolder = findFolderByID(id);
  //   // Destructure the selectedFolder object
  //   const { colour: folderColour } = selectedFolder;
  //   // Assemble the updated folder
  //   const updatedFolder = {
  //     id: id,
  //     text: name,
  //     colour: folderColour,
  //   };
  //   // Delete the old version
  //   deleteFolder(id);
  //   // Save the updated version (with the original timestamp ID)
  //   setFolders((prevFolders) => [...prevFolders, updatedFolder]);
  // }

  async function handleUpdateFolderFormSubmit(name, id) {
    const updatedFolder = { title: name };
    try {
      await axios.patch(
        `https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/folders/${id}/`,
        updatedFolder
      );
      // TODO: check if the line below actually checks the request status
      console.log("Folder updated successfully.");
      // TODO: move this into click handler (handleDeleteBtnClick) in NotesList.js???mayne not
      getInitialFoldersDataFromApi();
    } catch (error) {
      console.error("Error updating folder:", error.message);
    }
  }

  // -- RENDER ELEMENTS --

  if (displayPageChoice === "create") {
    return (
      // Display transcriber
      <>
        <Header
          title="transcriber"
          showNavIcon={true}
          navIcon={faListUl}
          onNavIconClick={showNotesList}
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
          <NotesList
            notes={notes}
            folders={folders}
            selectNote={selectNote}
            selectedNote={selectedNote}
            deleteNote={deleteNote}
            openEditPage={openEditPage}
            handleAddNoteToFolder={handleAddNoteToFolder}
            folderChoice="inbox"
            handleNewFolderFormSubmit={handleNewFolderFormSubmit}
            cancelNewFolderForm={cancelNewFolderForm}
            handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
            showNewFolderForm={showNewFolderForm}
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
          />
        </main>
      </>
    );
  }
}
