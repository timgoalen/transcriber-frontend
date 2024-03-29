import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

/**
 * Renders an `X` button for closing elements.
 */
export default function CloseBtn({ onClick }) {
  return (
    <button
      id="cancel-btn"
      className="close-auth-form-btn"
      onClick={onClick}
      aria-label="Cancel button"
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}
