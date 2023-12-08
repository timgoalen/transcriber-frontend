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

function NotesList({ notes }) {
  return (
    <main className="list-page-main">
      {/* <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul> */}

      {notes.map((note, index) => (
        <div key={index} className="list-page-item">
          <div className="item-text">
            <p>{note}</p>
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
    // console.log(textInput);
  }

  // function handleSaveBtnClick() {
  //   // props.createNote(textInput);
  //   notes.push(textInput);
  //   console.log({notes});
  //   console.log({textInput});
  // }

  // function handleClearBtnClick() {
  //   setTextInput("");
  //   console.log({textInput});
  // }

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

      {/* <section className="toolbar">
        <div className="footer-left">
          <Button
            name="Save"
            icon={faArrowUpFromBracket}
            onClick={handleSaveBtnClick}
          />
        </div>

        <div className="footer-right">
          <Button name="Clear" icon={faTrashCan} onClick={handleClearBtnClick} />
        </div>
      </section> */}
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

function Toolbar({ saveNote, onClear }) {
  return (
    <section className="toolbar">
      <div className="footer-left">
        <Button name="Save" icon={faArrowUpFromBracket} onClick={saveNote} />
      </div>

      <div className="footer-right">
        <Button name="Clear" icon={faTrashCan} onClick={onClear} />
      </div>
    </section>
  );
}

// -- APP --

export default function Transcriber() {
  const [displayList, setDisplayList] = useState("hide");
  const [textForNote, setTextForNote] = useState("");
  const handleTextFromUserInput = (text) => {
    setTextForNote(text);
  };

  const [notes, setNotes] = useState([]);

  const saveNote = () => {
    setNotes([...notes, textForNote]);
    console.log({ notes });
    console.log({ textForNote });
    // setTextForNote("");
  };

  const clearTextArea = () => {
    setTextForNote("");
  };

  if (displayList == "hide") {
    return (
      <>
        <Header
          title="transcriber"
          onListClick={() => setDisplayList("show")}
        />
        <TextArea sendTextToDefaultFunction={handleTextFromUserInput} />
        <MicrophoneIcon onMicrophoneClick={() => alert("Mic")} />
        <Toolbar saveNote={saveNote} clearTextArea={clearTextArea} />
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <Header title="notes" onListClick={() => setDisplayList("hide")} />
        <NotesList notes={notes} />
      </>
    );
  }
}
