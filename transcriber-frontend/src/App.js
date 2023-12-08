import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
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

function TextArea() {
  const [textInput, setTextInput] = useState("");

  const handleTextareaChange = (event) => {
    setTextInput(event.target.value);
    console.log(textInput);
  };

  return (
    <>
      <div id="main-container">
        <section id="text-container">
          <textarea id="text-area" value={textInput} onChange={handleTextareaChange}></textarea>
          {/* <div id="canvas-container">
            <canvas id="audio-visualizer"></canvas>
          </div> */}
        </section>
      </div>

      <section className="toolbar">
        <div className="footer-left">
          <Button name="Save" icon={faArrowUpFromBracket} />
        </div>

        <div className="footer-right">
          <Button name="Clear" icon={faTrashCan} />
        </div>
      </section>
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

// function Toolbar({ onSave, onClear }) {
//   return (
//     <section className="toolbar">
//       <div className="footer-left">
//         <Button name="Save" icon={faArrowUpFromBracket} onClick={onSave} />
//       </div>

//       <div className="footer-right">
//         <Button name="Clear" icon={faTrashCan} onClick={onClear} />
//       </div>
//     </section>
//   );
// }

// APP

let showList = false;
// const [showList, setShowList] = useState(0);

export default function Transcriber() {
  if (!showList) {
    return (
      <>
        <Header title="transcriber" onListClick={() => alert("1")} />
        <TextArea />
        <MicrophoneIcon onMicrophoneClick={() => alert("Mic")} />
        {/* <Toolbar onSave={() => alert("Save")} onClear={() => alert("Clear")} /> */}
      </>
    );
  } else {
    return <Header title="list" />;
  }
}
