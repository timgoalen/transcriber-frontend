import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainTool({ icon, onMainToolClick, isRecording }) {
  return (
    <button
      id="microphone-container"
      aria-label="Microphone"
      className={isRecording ? "recording-on" : "recording-off"}
      onClick={onMainToolClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
