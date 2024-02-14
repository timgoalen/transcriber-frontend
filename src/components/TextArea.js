import styles from "../styles/TextArea.module.css";
import AudioVisualizer from "./AudioVisualizer";

export default function TextArea({
  textAreaInput,
  setTextAreaInput,
  isRecording,
}) {
  const dynamicStyles = {
    borderColor: isRecording ? "var(--red)" : "var(--grey)",
  };

  function handleTextareaChange(event) {
    setTextAreaInput(event.target.value);
  }

  return (
    <>
      <section className={styles.TextContainer}>
        <textarea
          className={styles.TextArea}
          value={textAreaInput}
          onChange={handleTextareaChange}
          style={dynamicStyles}
          aria-label="Main Text Input"
        ></textarea>

        {isRecording && <AudioVisualizer />}
      </section>
    </>
  );
}
