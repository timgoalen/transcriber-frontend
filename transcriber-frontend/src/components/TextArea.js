export default function TextArea({ handleUserInputText, textInput }) {
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
