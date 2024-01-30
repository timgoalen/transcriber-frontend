// import AudioVisualizer from "./AudioVisualizer";

export default function TextArea({
  handleTextAreaUserInput,
  textAreaInput,
  isRecording,
}) {
  const styles = { borderColor: isRecording ? "var(--red)" : "var(--grey)" };

  function handleTextareaChange(event) {
    handleTextAreaUserInput(event.target.value);
  }

  return (
    <>
      <section id="text-container">
        <textarea
          id="text-area"
          value={textAreaInput}
          onChange={handleTextareaChange}
          style={styles}
          aria-label="Main Text Input"
        ></textarea>
        {/* <AudioVisualizer isRecording={isRecording} /> */}
      </section>
    </>
  );
}
