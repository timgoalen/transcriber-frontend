import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainTool({ icon, onMainToolClick }) {
  return (
    <button id="microphone-container">
      <FontAwesomeIcon icon={icon} onClick={onMainToolClick} />
    </button>
  );
}
