import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

// const notes = [];

function Button({ name, icon, onClick }) {
  return (
    <button className="btn-container" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <div className="btn-text">{name}</div>
    </button>
  );
}

function Header({ title, onListClick }) {
  return (
    <header>
      <h1>{title}</h1>
      <div className="list-view-btn-container">
        <Button icon={faListUl} onClick={onListClick} />
      </div>
    </header>
  );
}

function generateTimestamp() {
  return Date.now().toString();
}

function NotesList({ notes }) {
  return (
    <main className="list-page-main">
      {/* change to <ul> <li>?? */}
      {notes.map(({ timestamp, body }) => (
        <div key={timestamp} id={timestamp} className="list-page-item">
          <div className="item-text">
            <p>{body}</p>
          </div>
          <div className="item-tools">
            <i className="fa-solid fa-expand"></i>
          </div>
        </div>
      ))}
    </main>
  );
}

function TextArea({ sendTextToDefaultFunction, clearTextarea }) {
  const [textInput, setTextInput] = useState("");

  function handleTextareaChange(event) {
    setTextInput(event.target.value);
    sendTextToDefaultFunction(textInput);
  }

  return (
    <>
      <div id="main-container">
        <section id="text-container">
          <textarea
            id="text-area"
            value={textInput}
            onChange={handleTextareaChange}
          ></textarea>
          {/* <div id="canvas-container">
            <canvas id="audio-visualizer"></canvas>
          </div> */}
        </section>
      </div>
    </>
  );
}

function MicrophoneIcon({ onMicrophoneClick }) {
  return (
    <button id="microphone-container" onClick={onMicrophoneClick}>
      <FontAwesomeIcon icon={faMicrophone} />
    </button>
  );
}

function Toolbar({ handleSaveBtnClick, onClear }) {
  return (
    <section className="toolbar">
      <div className="footer-left">
        <Button name="Save" icon={faArrowUpFromBracket} onClick={handleSaveBtnClick} />
      </div>

      <div className="footer-right">
        <Button name="Clear" icon={faTrashCan} onClick={onClear} />
      </div>
    </section>
  );
}

// -- APP --

export default function TranscriberApp() {
  // Control list page display
  const [displayList, setDisplayList] = useState("hide");

  // Retrieve data from Textarea and save to state
  const [textForNote, setTextForNote] = useState("");
  const handleTextFromUserInput = (text) => {
    setTextForNote(text);
  };

  // Save an array of notes to state
  const [notes, setNotes] = useState([]);

  function saveNote() {
    setNotes([...notes, { timestamp: generateTimestamp(), body: textForNote }]);
  };

  function showNotesList() {
    setDisplayList("show");
  }

  function handleSaveBtnClick() {
    saveNote();
    showNotesList();
  };

  const clearTextArea = () => {
    setTextForNote("");
  };

  if (displayList == "hide") {
    return (
      // Display transcriber
      <>
        <Header
          title="transcriber"
          onListClick={() => setDisplayList("show")}
        />
        <TextArea sendTextToDefaultFunction={handleTextFromUserInput} />
        <MicrophoneIcon onMicrophoneClick={() => alert("Mic")} />
        <Toolbar handleSaveBtnClick={handleSaveBtnClick} clearTextArea={clearTextArea} />
      </>
    );
  } else {
    // Display Notes list
    return (
      <>
        <Header title="notes" onListClick={() => setDisplayList("hide")} />
        <NotesList notes={notes} />
      </>
    );
  }
}
