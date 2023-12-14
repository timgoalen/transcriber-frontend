import { useState, useEffect } from "react";

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

// -- APP --

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [selectedNote, setSelectedNote] = useState([]);
  // Save an array of notes to state
  // const [notes, setNotes] = useState([]);

  // Get any existing notes from local storage
  const getInitialData = () => {
    const initialData = JSON.parse(localStorage.getItem("notes"));
    if (!initialData) {
      return [];
    } else {
      return initialData;
    }
  };

  const [notes, setNotes] = useState(getInitialData);
  // Control list page display
  const [displayPage, setDisplayPage] = useState("create");

  const [isRecording, setIsRecording] = useState(false);

  // Transfer 'notes' state to local storage any time the state is changed
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    console.log("notes:");
    console.log(notes);
  }, [notes]);

  // useEffect(() => {
  //   console.log(`isRecording has been changed to ${isRecording}`);
  //   if (isRecording) {
  //   } else {
  //   }
  // }, [isRecording]);

  // Retrieve data from Textarea and save to state
  const handleUserInputText = (text) => {
    setTextInput(text);
  };

  function setTextFromSpeechRecognition(text) {
    setTextInput(text);
  }

  // CRUD FUNCTIONS

  function createNote(text) {
    const id = generateTimestamp();
    const newNote = {id: id, text: text}
    return newNote;
  }

  function saveNote(note) {
    // setNotes([...notes], {generateTimestamp(), text})
    // localStorage.setItem(generateTimestamp(), textInput);
    setNotes((prevNotes) => [...prevNotes, note]);
  }

  // function deleteNote(timestamp) {
  //   localStorage.removeItem(timestamp);
  // }
  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  }

  // EVENT HANDLERS

  function showNotesList() {
    setDisplayPage("list");
  }

  function handleSaveBtnClick() {
    const newNote = createNote(textInput);
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
    setDisplayPage("update");
  }

  function handleUpdateBtnClick() {
    // Assemble the new note
    const id = selectedNote.id;
    const updatedNote = {id: id, text: textInput};
    // Delete the old version
    deleteNote(id);
    // Save the updated version (with the original timestamp ID)
    saveNote(updatedNote);
    showNotesList();
  }

  // -- RECOGNITION INITIALIZATION --

  // this only runs on first render (has '[]' after useEffect callback)
  // useEffect(() => {
  // try {
  //   var SpeechRecognition =
  //     window.SpeechRecognition || window.webkitSpeechRecognition;
  //   console.log("speech recognisiotn initialized");
  // } catch (e) {
  //   alert(
  //     "Your browser doesn't support speech recognition. Try using Chrome or Safari."
  //   );
  // }

  // try {
  //   var recognition = new SpeechRecognition();
  //   console.log("speech recognisiotn declared");
  // } catch (e) {
  //   alert(
  //     "Your browser doesn't support speech recognition. Try using Chrome or Safari."
  //   );
  //   }

  //   let recognising = false;
  //   recognition.continuous = true;
  //   recognition.interimResults = false;
  //   recognition.lang = "en-UK";
  // }, []);

  function handleMicrophoneClick() {
    if (!isRecording) {
      setIsRecording(true);
    } else {
      setIsRecording(false);
    }
    // setIsRecording(!isRecording);
    // if (recognising) {
    //   // recognition.stop();
    //   setIsRecording(false);
    //   // For audio visualizer
    //   // stopVisualizer();
    //   // canvasContainer.style.display = "none";
    //   // updateUiRecordingStopped();
    // } else {
    //   // recognition.start();
    //   setIsRecording(true);
    //   // For audio visualizer
    //   // initVisualizer();
    //   // updateUiRecordingStarted();
    //   // canvasContainer.style.display = "block";
    // }

    // recognising = !recognising;
  }

  // -- RECOGNITION FUNCTIONALITY --

  // recognition.onresult = (event) => {
  //   let currentTranscript = "";
  //   const capitaliseAfterThese = [".", "!", "?"];

  //   for (let i = event.resultIndex; i < event.results.length; i++) {
  //     currentTranscript = event.results[i][0].transcript;
  //   }

  //   // TODO: explain this code in comments..
  //   if (currentTranscript) {
  //     const previousTranscript = textInput;
  //     const punctuatedTranscript = punctuate(currentTranscript);

  //     if (previousTranscript === "") {
  //       setTextInput(capitalise(punctuatedTranscript));
  //     } else {
  //       let lastCharacter = previousTranscript.charAt(
  //         previousTranscript.length - 2
  //       );
  //       console.log(lastCharacter);
  //       if (capitaliseAfterThese.includes(lastCharacter)) {
  //         setTextInput(
  //           previousTranscript + capitaliseNewSentence(punctuatedTranscript)
  //         );
  //       } else {
  //         setTextInput(previousTranscript + punctuatedTranscript);
  //       }
  //     }
  //   }
  // };

  // // Handle errors
  // recognition.onerror = function (event) {
  //   console.error("Speech recognition error: " + event.error);
  // };

  // -- RENDER ELEMENTS --

  if (displayPage === "create") {
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
  } else if (displayPage === "list") {
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
            setDisplayPage("create");
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
        <MainTool icon={faMicrophone} onMainToolClick={() => alert("Mic")} />
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
