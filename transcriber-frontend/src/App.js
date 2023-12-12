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
  faXmark,
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

function NotesList({
  notes,
  selectNote,
  selectedNote,
  deleteNote,
  openEditPage,
}) {
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

  // Get an array of the note keys (IDs)
  const localStorageTimestampKeys = Object.keys(localStorage);
  // Sort the array into reverse chronological order
  localStorageTimestampKeys.sort((a, b) => {
    return parseInt(b) - parseInt(a);
  });

  return (
    <main className="list-page-main">
      {localStorageTimestampKeys.map((key) => (
        <div
          key={key}
          id={key}
          className="list-page-item"
          onClick={() => handleItemClick(key, localStorage.getItem(key))}
        >
          <div className="item-text">
            <p>{localStorage.getItem(key)}</p>
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
            <div id="edit-btn-modal" onClick={openEditPage}>
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

  function handleTextareaChange(event) {
    handleUserInputText(event.target.value);
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

function Toolbar({
  tool1Name,
  tool1Icon,
  tool1OnClick,
  tool2Name,
  tool2Icon,
  tool2OnClick,
}) {
  return (
    <section className="toolbar">
      <div className="footer-left">
        <Button name={tool1Name} icon={tool1Icon} onClick={tool1OnClick} />
      </div>

      <div className="footer-right">
        <Button name={tool2Name} icon={tool2Icon} onClick={tool2OnClick} />
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
  const [displayPage, setDisplayPage] = useState("create");

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

  if (displayPage === "create") {
    return (
      // Display transcriber
      <>
        <Header
          title="transcriber"
          showListIcon={true}
          onListClick={showNotesList}
        />
        <TextArea
          handleUserInputText={handleUserInputText}
          textInput={textInput}
        />
        <MainTool icon={faMicrophone} onMainToolClick={() => alert("Mic")} />
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
