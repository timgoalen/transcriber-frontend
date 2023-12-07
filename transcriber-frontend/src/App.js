import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
      <div className="list-view-btn-container">
        <a href="list-page.html">
          <FontAwesomeIcon icon={faListUl} />
        </a>
      </div>
    </header>
  );
}

function TextArea() {
  return (
    <div id="main-container">
      <section id="text-container">
        <textarea id="text-area"></textarea>
        {/* <div id="canvas-container">
            <canvas id="audio-visualizer"></canvas>
          </div> */}
      </section>
    </div>
  );
}

function MicrophoneIcon() {
  return (
    <div id="microphone-container">
      <FontAwesomeIcon icon={faMicrophone} />
    </div>
  );
}

function Button({ name, icon, onClick }) {
  return (
    <button className="btn-container" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <div className="btn-text">{name}</div>
    </button>
  );
}

function Toolbar({ onSave, onClear }) {
  return (
    <section className="toolbar">
      <div className="footer-left">
        <Button name="Save" icon={faArrowUpFromBracket} onClick={onSave}/>
      </div>

      <div className="footer-right">
        <Button name="Clear" icon={faTrashCan} onClick={onClear}/>
      </div>
    </section>
  );
}

export default function Transcriber() {
  return (
    <>
      <Header title="transcriber" />
      <TextArea />
      <MicrophoneIcon />
      <Toolbar onSave={() => alert("Saved")} onClear={() => alert("Clear")}/>
    </>
  );
}
