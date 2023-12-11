import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
  faExpand,
  faArrowLeft,
  faPen,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Button({ name, icon, onClick }) {
  return (
    <button className="btn-container" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <div className="btn-text">{name}</div>
    </button>
  );
}

function Header({ title, onListClick, showListIcon }) {
  return (
    <header>
      <h1>{title}</h1>
      {showListIcon === true && (
        <div className="list-view-btn-container">
          <Button icon={faListUl} onClick={onListClick} />
        </div>
      )}
    </header>
  );
}

function generateTimestamp() {
  return Date.now().toString();
}

// -- NOTES LIST --

function NotesList({ notes, selectNote, selectedNote, deleteNote }) {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  function toggleDetailModal() {
    setIsDetailModalOpen(!isDetailModalOpen);
  }

  function handleItemClick(timestamp, body) {
    selectNote(timestamp, body);
    toggleDetailModal();
  }

  function handleDeleteBtnClick(timestamp) {
    deleteNote(timestamp);
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
            <div id="edit-btn-modal">
              <FontAwesomeIcon icon={faPen} />
              <div>Edit</div>
            </div>
            <div id="delete-btn-modal">
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => handleDeleteBtnClick(selectedNote.timestamp)}
              />
              <div>Delete</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// -- TEXT AREA --

function TextArea({ handleUserInputText, textInput, clearTextarea }) {
  // const [textInput, setTextInput] = useState("");

  function handleTextareaChange(event) {
    handleUserInputText(event.target.value);
    // setTextInput(event.target.value);
    // sendTextToDefaultFunction(textInput);
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

function MainTool({ icon, onMainToolClick }) {
  return (
    <button id="microphone-container">
      <FontAwesomeIcon icon={icon} onClick={onMainToolClick} />
    </button>
  );
}

function Toolbar({ handleSaveBtnClick, clearTextArea }) {
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
        <Button name="Clear" icon={faTrashCan} onClick={clearTextArea} />
      </div>
    </section>
  );
}

// -- APP --

export default function TranscriberApp() {
  const [textInput, setTextInput] = useState("");
  const [selectedNote, setSelectedNote] = useState([]);
  // Save an array of notes to state
  const [notes, setNotes] = useState([]);
  // Control list page display
  const [displayList, setDisplayList] = useState("hide");

  // Retrieve data from Textarea and save to state
  // const [textForNote, setTextForNote] = useState("");
  const handleUserInputText = (text) => {
    // setTextForNote(text);
    setTextInput(text);
  };

  function saveNote() {
    // setNotes([...notes, { timestamp: generateTimestamp(), body: textForNote }]);
    setNotes([...notes, { timestamp: generateTimestamp(), body: textInput }]);
  }

  function showNotesList() {
    setDisplayList("show");
  }

  function handleSaveBtnClick() {
    saveNote();
    showNotesList();
  }

  function deleteNote(timestamp) {
    // Return a new array with selected note filtered out
    setNotes(notes.filter((note) => note.timestamp !== timestamp));
  }

  function selectNote(timestamp, body) {
    setSelectedNote({ timestamp, body });
  }

  const clearTextArea = () => {
    setTextInput("");
  };

  if (displayList == "hide") {
    return (
      // Display transcriber
      <>
        <Header
          title="transcriber"
          showListIcon={true}
          onListClick={() => setDisplayList("show")}
        />
        {/* <TextArea sendTextToDefaultFunction={handleUserInputText} /> */}
        <TextArea
          handleUserInputText={handleUserInputText}
          textInput={textInput}
        />
        <MainTool icon={faMicrophone} onMainToolClick={() => alert("Mic")} />
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
        <Header title="notes" showListIcon={false} />
        <NotesList
          notes={notes}
          selectNote={selectNote}
          selectedNote={selectedNote}
          deleteNote={deleteNote}
        />
        <MainTool
          icon={faPlus}
          onMainToolClick={function() {
            setDisplayList("hide");
            clearTextArea();
          }}
        />
      </>
    );
  }
}
