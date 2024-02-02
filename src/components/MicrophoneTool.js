import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MicrophoneTool({
  icon,
  handleMicrophoneClick,
  isRecording,
}) {
  return (
    <button
      id="main-tool-container"
      aria-label="Microphone"
      className={isRecording ? "recording-on" : "recording-off"}
      onClick={handleMicrophoneClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
