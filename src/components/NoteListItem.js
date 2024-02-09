import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

export default function NoteListItem({
  id,
  text,
  folderColour,
  handleNoteItemClick,
}) {
  return (
    <div className="list-page-item" onClick={() => handleNoteItemClick(id)}>
      <div className="item-text">
        <p>{text}</p>
      </div>
      <div className="item-tools" style={{ color: folderColour }}>
        <FontAwesomeIcon icon={faExpand} />
      </div>
    </div>
  );
}
