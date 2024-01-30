import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function FolderListItem({ id, title, colour, handleFolderClick }) {
  return (
    <div className="list-page-item">
      {/* Colour block */}
      <div
        className="item-colour-block"
        style={{ backgroundColor: colour }}
      ></div>

      {/* Title */}
      <div className="item-text" onClick={() => handleFolderClick(id)}>
        <p>{title}</p>
      </div>

      {/* Toolbar */}
      <div className="folder-toolbar">
        <div
          className="item-tools"
          //   onClick={() => handleFolderOptionsClick(folder.id)}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
      </div>
    </div>
  );
}
