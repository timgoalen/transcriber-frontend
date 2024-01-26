import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderBtn({ onClick, ariaLabel, icon }) {
  return (
    <div className="header-btn-container">
      <button
        className="btn-container"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        <FontAwesomeIcon icon={icon} />
      </button>
    </div>
  );
}
