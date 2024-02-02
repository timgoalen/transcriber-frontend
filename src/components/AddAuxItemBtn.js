import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddAuxItemBtn({ onClick, text }) {
  return (
    <div onClick={onClick} className="list-page-item add-aux-item-btn">
      <FontAwesomeIcon icon={faPlus} />
      <div className="add-aux-item-text">{text}</div>
    </div>
  );
}
