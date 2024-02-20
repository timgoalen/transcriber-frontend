import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

/**
 * Renders a note item.
 */
export default function NoteListItem({ onClick, text, folderColour }) {
  return (
    <div className="list-page-item" onClick={onClick}>
      <div className="item-text">
        <p>{text}</p>
      </div>
      <div className="item-tools" style={{ color: folderColour }}>
        <FontAwesomeIcon icon={faExpand} />
      </div>
    </div>
  );
}
