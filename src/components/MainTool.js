import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Renders the main tool, for initiating CREATE actions.
 */
export default function MainTool({ className, ariaLabel, onClick, icon }) {
  return (
    <button
      id="main-tool-container"
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}
