import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
  faExpand,
  faArrowLeft,
  faPen,
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

function NotesList({ notes, selectNote, selectedNote }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  function toggleDetailModal() {
    console.log("toggle");
    setIsDetailModalOpen(!isDetailModalOpen);
  }

  function handleItemClick(timestamp, body) {
    selectNote(timestamp, body);
    toggleDetailModal();
  }

  return (
    <main className="list-page-main">
      {notes.map(({ timestamp, body }) => (
        <div
          key={timestamp}
          id={timestamp}
          className="list-page-item"
          onClick={() => handleItemClick(timestamp, body)}
          // onClick={() => selectNote(timestamp, body)}
        >
          <div className="item-text">
            <p>{body}</p>
          </div>
          <div className="item-tools">
            <FontAwesomeIcon icon={faExpand} />
          </div>
        </div>
      ))}

      <section
        id="detail-view-modal-container"
        style={{ display: isDetailModalOpen ? "grid" : "none" }}
      >
        <div id="detail-view-modal-content">
          <div id="detail-view-modal-text">{selectedNote.body}</div>
          <div id="detail-view-modal-tools-container">
            <div id="back-btn-modal" onClick={toggleDetailModal}>
              {/* refactor to "Button" component */}
              <FontAwesomeIcon icon={faArrowLeft} />
              <div>Back</div>
            </div>
            <div id="edit-btn-modal" data-id="${id}">
              <FontAwesomeIcon icon={faPen} />
              <div>Edit</div>
            </div>
            <div id="delete-btn-modal" data-id="${id}">
              <FontAwesomeIcon icon={faTrashCan} />
              <div>Delete</div>
            </div>
          </div>
        </div>
      </section>
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
        <Button
          name="Save"
          icon={faArrowUpFromBracket}
          onClick={handleSaveBtnClick}
        />
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
  }

  function showNotesList() {
    setDisplayList("show");
  }

  function handleSaveBtnClick() {
    saveNote();
    showNotesList();
  }

  const [selectedNote, setSelectedNote] = useState([]);
  function selectNote(timestamp, body) {
    setSelectedNote({ timestamp, body });
    console.log(selectedNote);
  }

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
        <Toolbar
          handleSaveBtnClick={handleSaveBtnClick}
          clearTextArea={clearTextArea}
        />
      </>
    );
  } else {
    // Display notes list
    return (
      <>
        <Header title="notes" onListClick={() => setDisplayList("hide")} />
        <NotesList notes={notes} selectNote={selectNote} selectedNote={selectedNote} />
      </>
    );
  }
}
