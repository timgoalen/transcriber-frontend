import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MicrophoneTool({
  className,
  ariaLabel,
  onClick,
  icon,
}) {
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
