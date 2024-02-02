import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MicrophoneIcon from "../assets/custom_icons/MicrophoneIcon"

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
      <MicrophoneIcon id="microphone-tool-icon"/>
      {/* <FontAwesomeIcon icon={icon} /> */}
    </button>
  );
}
