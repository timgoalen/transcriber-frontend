import { useState, useEffect, useRef } from "react";

// 3rd party imports

import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// Internal imports

import Header from "./components/Header.js";
import NotesList from "./components/NotesList.js";
import TextArea from "./components/TextArea.js";
import MainTool from "./components/MainTool.js";
import Toolbar from "./components/Toolbar.js";
import SpeechRecognition from "./components/SpeechRecognition.js";
import { generateTimestamp } from "./utils/utils.js";
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

// -- APP --

export default function App() {
  // Save an array of notes to state
  const [notes, setNotes] = useState(getInitialData);
  // Get user input from the text area
  const [textInput, setTextInput] = useState("");
  // Currently selected note
  const [selectedNote, setSelectedNote] = useState([]);
  // Microphone recording status
  const [isRecording, setIsRecording] = useState(false);
  // Page display choice
  const [displayPageChoice, setDisplayPageChoice] = useState("create");

  // Transfer 'notes' state to local storage any time the state is changed
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("notes:");
    console.log(notes);
  }, [notes]);

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
      let lastCharacter = textInput.charAt(textInput.length - 2);
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

  // CRUD FUNCTIONS

  function assembleNote(text) {
    const id = generateTimestamp();
    const newNote = { id: id, text: text };
    return newNote;
  }

  function saveNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  // EVENT HANDLERS

  function showNotesList() {
    setDisplayPageChoice("list");
  }

  function handleSaveBtnClick() {
    const newNote = assembleNote(textInput);
    saveNote(newNote);
    showNotesList();
  }

  const clearTextArea = () => {
    setTextInput("");
  };

  function selectNote(id, text) {
    setSelectedNote({ id, text });
  }

  function openEditPage() {
    setTextInput(selectedNote.text);
    setDisplayPageChoice("update");
  }

  function handleUpdateBtnClick() {
    // *TODO: break down into seperate functions:
    // Assemble the new note
    const id = selectedNote.id;
    const updatedNote = { id: id, text: textInput };
    // Delete the old version
    deleteNote(id);
    // Save the updated version (with the original timestamp ID)
    saveNote(updatedNote);
    showNotesList();
  }

  function handleMicrophoneClick() {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
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
          handleUserInputText={handleUserInputText}
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
  } else if (displayPageChoice === "list") {
    // Display notes list
    return (
      <>
        <Header title="notes" showListIcon={false} />
        <NotesList
          notes={notes}
          selectNote={selectNote}
          selectedNote={selectedNote}
          deleteNote={deleteNote}
          openEditPage={openEditPage}
        />
        <MainTool
          icon={faPlus}
          onMainToolClick={function () {
            setDisplayPageChoice("create");
            clearTextArea();
          }}
        />
      </>
    );
  } else {
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
          handleUserInputText={handleUserInputText}
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
  }
}
