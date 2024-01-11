import AudioVisualizer from "./AudioVisualizer";

export default function TextArea({
  handleTextAreaUserInput,
  textAreaInput,
  isRecording,
}) {
  function handleTextareaChange(event) {
    handleTextAreaUserInput(event.target.value);
  }

  const styles = { borderColor: isRecording ? "var(--red)" : "var(--grey)" };

  return (
    <>
      <div id="main-container">
        <section id="text-container">
          <textarea
            id="text-area"
            value={textAreaInput}
            onChange={handleTextareaChange}
            style={styles}
          ></textarea>
          <AudioVisualizer isRecording={isRecording} />
        </section>
      </div>
    </>
  );
}
