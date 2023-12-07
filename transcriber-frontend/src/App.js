function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}

function TextArea() {
  return <textarea></textarea>;
}

function MicrophoneIcon() {
  return <div id="microphone-container">Microphone</div>;
}

function Toolbar() {
  return (
    <div>
      <div class="footer-left">
        <div id="save-btn">
          (save icon)
          <div class="btn-text">Save</div>
        </div>
      </div>

      <div class="footer-right">
        <div id="clear-btn">
          (clear icon)
          <div class="btn-text">Clear</div>
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
