import MicrophoneIcon from "../assets/custom_icons/MicrophoneIcon";

/**
 * Renders a tool for starting and stopping the voice-recognition functionality.
 */
export default function MicrophoneTool({ handleMicrophoneClick, isRecording }) {
  return (
    <button
      id="main-tool-container"
      aria-label="Microphone"
      className={isRecording ? "recording-on" : "recording-off"}
      onClick={handleMicrophoneClick}
    >
      <MicrophoneIcon
        id="microphone-tool-icon"
        fillColour={isRecording ? "var(--red)" : "var(--orange)"}
      />
    </button>
  );
}
