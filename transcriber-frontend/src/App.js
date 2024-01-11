import { useState, useEffect, useRef } from "react";

// 3rd party imports

import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faFolder,
  faSquarePlus,
} from "@fortawesome/free-regular-svg-icons";

// Internal imports

import Header from "./components/Header.js";
import NotesList from "./components/NotesList.js";
import FoldersList from "./components/FoldersList.js";
import TextArea from "./components/TextArea.js";
import MainTool from "./components/MainTool.js";
import Toolbar from "./components/Toolbar.js";
import SpeechRecognition from "./components/SpeechRecognition.js";
import Button from "./components/Button.js";
import EmptyPlaceholderGraphics from "./components/EmptyPlaceholderGraphics.js";

import { generateTimestamp, generateRandomColour } from "./utils/utils.js";
import {
  capitalise,
  capitaliseNewSentence,
  punctuate,
} from "./utils/speechRecognitionUtils.js";

// Get any existing notes from local storage
const getInitialData = () => {
  const initialData = JSON.parse(localStorage.getItem("notes"));
  if (!initialData) {
    return [];
  } else {
    return initialData;
  }
};

// Get any existing notes from local storage
const getInitialFoldersData = () => {
  const initialFoldersData = JSON.parse(localStorage.getItem("folders"));
  if (!initialFoldersData) {
    return [];
  } else {
    return initialFoldersData;
  }
};

// -- APP --

export default function App() {
  // Save an array of notes to state
  const [notes, setNotes] = useState(getInitialData);
  // Save an array of folders to state
  const [folders, setFolders] = useState(getInitialFoldersData);
  // Get user input from the text area
  const [textInput, setTextInput] = useState("");
  // Currently selected note
  // **TODO: refactor into "selectItem"??? (to use for both notes and folders)
  const [selectedNote, setSelectedNote] = useState([]);
  // Microphone recording status
  const [isRecording, setIsRecording] = useState(false);
  // Page display choice
  const [displayPageChoice, setDisplayPageChoice] = useState("create");
  // Show Add Folder form
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  // Set folder to save notes into
  const [targetFolder, setTargetFolder] = useState("inbox");

  // const [folderChoice, setFolderChoice] = useState(0);

  // Transfer 'notes' state to local storage any time the state is changed
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Transfer 'folders' state to local storage any time the state is changed
  useEffect(() => {
    localStorage.setItem("folders", JSON.stringify(folders));
  }, [folders]);

  // Retrieve data from Textarea and save to state
  const handleUserInputText = (text) => {
    setTextInput(text);
  };

  // Retrieve data from Speech Recognition and save to state
  function setTextFromSpeechRecognition(transcript) {
    // Add punctuation to replace the voice commands
    let punctuatedTranscript = punctuate(transcript);

    // If it's an empty note, start with a capital letter
    if (textInput === "") {
      let capitalisedTranscript = capitalise(punctuatedTranscript);
      setTextInput((prevTextInput) => prevTextInput + capitalisedTranscript);
    } else {
      // **THIS FUNCTIONALITY NOT WORKING YET**

      console.log(`textInput:${textInput}`);
      // Else if previous text in is the text area, get the last character
      let lastCharacter = textInput.charAt(textInput.length - 1);
      console.log(`last char:${lastCharacter}`);
      const capitaliseAfterThese = [".", "!", "?"];
      // If the last character signal a new sentence, add a capital letter
      if (capitaliseAfterThese.includes(lastCharacter)) {
        let newSentence = capitaliseNewSentence(punctuatedTranscript);
        setTextInput((prevTextInput) => prevTextInput + newSentence);
      } else {
        setTextInput((prevTextInput) => prevTextInput + punctuatedTranscript);
      }
    }
  }

  // -- CRUD FUNCTIONS --

  function assembleNote(text) {
    const id = generateTimestamp();
    const newNote = { id: id, text: text, folderId: targetFolder };
    return newNote;
  }

  function assembleFolder(text) {
    const id = generateTimestamp();
    const colour = generateRandomColour();
    const newFolder = { id: id, text: text, colour: colour };
    return newFolder;
  }

  function saveNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function saveFolder(folderName) {
    setFolders((prevFolders) => [...prevFolders, folderName]);
    cancelNewFolderForm();
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  function deleteFolder(id) {
    setFolders((prevFolders) => {
      return prevFolders.filter((folder) => folder.id !== id);
    });
  }

  function cancelNewFolderForm() {
    setShowNewFolderForm(false);
  }

  // EVENT HANDLERS

  function showNotesList() {
    setDisplayPageChoice("inbox");
  }

  function showFoldersList() {
    setDisplayPageChoice("folders");
  }

  function handleSaveBtnClick() {
    const newNote = assembleNote(textInput);
    saveNote(newNote);
    showNotesList();
  }

  const clearTextArea = () => {
    setTextInput("");
  };

  function selectNote(id, text, folderId) {
    setSelectedNote({ id, text, folderId });
  }

  function openEditPage() {
    setTextInput(selectedNote.text);
    setDisplayPageChoice("update");
  }

  function handleUpdateBtnClick() {
    // *TODO: break down into seperate functions:
    // Assemble the new note
    const id = selectedNote.id;
    const folderId = selectedNote.folderId;
    const updatedNote = { id: id, text: textInput, folderId: folderId };
    // Delete the old version
    deleteNote(id);
    // Save the updated version (with the original timestamp ID)
    saveNote(updatedNote);
    showNotesList();
  }

  function findFolderByID(id) {
    return folders.find((folder) => folder.id === id);
  }

  function handleUpdateFolderFormSubmit(name, id) {
    const selectedFolder = findFolderByID(id);
    // Destructure the selectedFolder object
    const { colour: folderColour } = selectedFolder;
    const updatedFolder = {
      id: id,
      text: name,
      colour: folderColour,
    };
    deleteFolder(id);
    setFolders((prevFolders) => [...prevFolders, updatedFolder]);
  }

  function handleAddNoteToFolder(targetFolderId) {
    // *TODO: break down into seperate functions:
    // Assemble the new note
    const { id, text } = selectedNote;
    const updatedNote = { id: id, text: text, folderId: targetFolderId };
    // Delete the old version
    deleteNote(id);
    // Save the updated version (with the original timestamp ID)
    saveNote(updatedNote);
    showFoldersList();
  }

  function handleMicrophoneClick() {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
  }

  function handleShowNewFolderBtnClick() {
    setShowNewFolderForm(true);
  }

  function handleCreateNewNoteinFolderClick(folderId) {
    setTargetFolder(folderId);
    setDisplayPageChoice("create");
    clearTextArea();
  }

  function handleNewFolderFormSubmit(folderName) {
    const newFolder = assembleFolder(folderName);
    saveFolder(newFolder);
  }

  // -- RENDER ELEMENTS --

  if (displayPageChoice === "create") {
    return (
      // Display transcriber
      <>
        <Header
          title="transcriber"
          showListIcon={true}
          listIcon={faListUl}
          onListClick={showNotesList}
        />
        <TextArea
          handleUserInputText={handleUserInputText}
          textInput={textInput}
          isRecording={isRecording}
        />
        <SpeechRecognition
          isRecording={isRecording}
          setTextFromSpeechRecognition={setTextFromSpeechRecognition}
          textInput={textInput}
        />
        <MainTool
          icon={faMicrophone}
          onMainToolClick={handleMicrophoneClick}
          isRecording={isRecording}
        />
        <Toolbar
          tool1Name="Save"
          tool1Icon={faArrowUpFromBracket}
          tool1OnClick={handleSaveBtnClick}
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
          showListIcon={true}
          listIcon={faFolder}
          onListClick={showFoldersList}
        />
        <main className="list-page-main">
          <NotesList
            notes={notes}
            folders={folders}
            selectNote={selectNote}
            selectedNote={selectedNote}
            deleteNote={deleteNote}
            openEditPage={openEditPage}
            displayPageChoice={displayPageChoice}
            handleAddNoteToFolder={handleAddNoteToFolder}
            folderChoice="inbox"
            handleNewFolderFormSubmit={handleNewFolderFormSubmit}
            cancelNewFolderForm={cancelNewFolderForm}
            handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
            showNewFolderForm={showNewFolderForm}
          />
          <MainTool
            icon={faPlus}
            onMainToolClick={function () {
              // TODO: refactor into separate function
              setDisplayPageChoice("create");
              setTargetFolder("inbox");
              clearTextArea();
            }}
          />
        </main>
      </>
    );
  } else if (displayPageChoice === "update") {
    // Display update page
    return (
      <>
        <Header title="edit" showListIcon={false} />
        <TextArea
          handleUserInputText={handleUserInputText}
          textInput={textInput}
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
          textInput={textInput}
        />
        <Toolbar
          tool1Name="Update"
          tool1Icon={faArrowUpFromBracket}
          tool1OnClick={handleUpdateBtnClick}
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
          showListIcon={true}
          listIcon={faListUl}
          onListClick={showNotesList}
        />
        <main className="list-page-main">
          <FoldersList
            folders={folders}
            selectNote={selectNote}
            selectedNote={selectedNote}
            deleteNote={deleteNote}
            openEditPage={openEditPage}
            displayPageChoice={displayPageChoice}
            isColourBlock={true}
            // **TODO: change name of this to make it clear that it's state, not a function
            showNewFolderForm={showNewFolderForm}
            saveFolder={saveFolder}
            assembleFolder={assembleFolder}
            cancelNewFolderForm={cancelNewFolderForm}
            deleteFolder={deleteFolder}
            handleUpdateFolderFormSubmit={handleUpdateFolderFormSubmit}
            findFolderByID={findFolderByID}
            notes={notes}
            handleAddNoteToFolder={handleAddNoteToFolder}
            handleNewFolderFormSubmit={handleNewFolderFormSubmit}
            handleCreateNewNoteinFolderClick={handleCreateNewNoteinFolderClick}
            handleShowNewFolderBtnClick={handleShowNewFolderBtnClick}
          />
          {/* TODO: refactor into component */}
          {!showNewFolderForm && (
            <div className="new-folder-btn">
              <Button
                name="New Folder"
                icon={faSquarePlus}
                onClick={handleShowNewFolderBtnClick}
                className="new-folder-btn"
              />
            </div>
          )}

          {/* <MainTool
            icon={faPlus}
            onMainToolClick={function () {
              setDisplayPageChoice("create");
              clearTextArea();
            }}
          /> */}
        </main>
      </>
    );
  }
}
