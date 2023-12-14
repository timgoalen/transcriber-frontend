import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainTool({ icon, onMainToolClick, isRecording }) {
  return (
    <button
      id="microphone-container"
      className={isRecording ? "recording-on" : "recording-off"}
    >
      <FontAwesomeIcon icon={icon} onClick={onMainToolClick} />
    </button>
  );
}
