import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CloseAuthFormsBtn({ onClick }) {
  return (
    <button id="cancel-btn" className="close-auth-form-btn" onClick={onClick}>
      <FontAwesomeIcon icon={faXmark} />
    </button>
  );
}
