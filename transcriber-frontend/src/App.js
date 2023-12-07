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

function Toolbar() {
  return (
    <div className="toolbar">
      <div className="footer-left">
        <div id="save-btn">
          <FontAwesomeIcon icon={faArrowUpFromBracket} />
          <div className="btn-text">Save</div>
        </div>
      </div>

      <div className="footer-right">
        <div id="clear-btn">
          <FontAwesomeIcon icon={faTrashCan} />
          <div className="btn-text">Clear</div>
        </div>
      </div>
    </div>
  );
}

export default function Transcriber() {
  return (
    <>
      <Header title="transcriber" />
      <TextArea />
      <MicrophoneIcon />
      <Toolbar />
    </>
  );
}
