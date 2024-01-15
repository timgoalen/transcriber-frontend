import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({ name, icon, onClick }) {
  return (
    <button className="btn-container" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      <div className="btn-text">{name}</div>
    </button>
  );
}
