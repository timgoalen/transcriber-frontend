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
import { generateTimestamp } from "./utils/utils.js";
import {
  capitalise,
  capitaliseNewSentence,
  punctuate,
} from "./utils/speechRecognitionUtils.js";

// APP

export default function App() {
  const [textInput, setTextInput] = useState("");
  const [selectedNote, setSelectedNote] = useState([]);
  // Save an array of notes to state
  const [notes, setNotes] = useState([]);
  // Control list page display
  const [displayPage, setDisplayPage] = useState("create");

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    console.log("use effect has run");
  });
  // useEffect(() => {
  //   console.log(`isRecording has been changed to ${isRecording}`);
  // }, [isRecording]);

  // Retrieve data from Textarea and save to state
  const handleUserInputText = (text) => {
    setTextInput(text);
  };

  function saveNote() {
    localStorage.setItem(generateTimestamp(), textInput);
  }

  function showNotesList() {
    setDisplayPage("list");
  }

  function openEditPage() {
    setTextInput(selectedNote.body);
    setDisplayPage("update");
  }

  function handleSaveBtnClick() {
    saveNote(textInput);
    showNotesList();
  }

  function handleUpdateBtnClick() {
    let timestamp = selectedNote.timestamp;
    localStorage.setItem(timestamp, textInput);
    showNotesList();
  }

  function deleteNote(timestamp) {
    localStorage.removeItem(timestamp);
  }

  function selectNote(timestamp, body) {
    setSelectedNote({ timestamp, body });
  }

  const clearTextArea = () => {
    setTextInput("");
  };

  // -- RECOGNITION INITIALIZATION --

  // this only runs on first render (has '[]' after useEffect callback)
  useEffect(() => {
    try {
      var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      console.log("speech recognisiotn initialized");
    } catch (e) {
      alert(
        "Your browser doesn't support speech recognition. Try using Chrome or Safari."
      );
    }

    try {
      var recognition = new SpeechRecognition();
      console.log("speech recognisiotn declared");
    } catch (e) {
      alert(
        "Your browser doesn't support speech recognition. Try using Chrome or Safari."
      );
    }

    let recognising = false;
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-UK";
  }, []);

  function handleMicrophoneClick() {
    setIsRecording(!isRecording);
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
        <MainTool icon={faMicrophone} onMainToolClick={handleMicrophoneClick} isRecording={isRecording} />
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
