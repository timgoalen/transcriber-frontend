import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ name, icon, onClick, ariaLabel, }) {
  return (
    <button className="btn-container" onClick={onClick} aria-label={ariaLabel}>
      <FontAwesomeIcon icon={icon} />
      <div className="btn-text">{name}</div>
    </button>
  );
}
