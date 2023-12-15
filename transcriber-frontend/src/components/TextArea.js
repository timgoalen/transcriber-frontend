import AudioVisualizer from "./AudioVisualizer";

export default function TextArea({
  handleUserInputText,
  textInput,
  isRecording,
}) {
  function handleTextareaChange(event) {
    handleUserInputText(event.target.value);
  }

  const styles = { borderColor: isRecording ? "var(--red)" : "var(--grey)" };

  return (
    <>
      <div id="main-container">
        <section id="text-container">
          <textarea
            id="text-area"
            value={textInput}
            onChange={handleTextareaChange}
            style={styles}
          ></textarea>
          <AudioVisualizer isRecording={isRecording} />
        </section>
      </div>
    </>
  );
}
