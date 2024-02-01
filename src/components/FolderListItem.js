import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function FolderListItem({
  id,
  title,
  colour,
  handleFolderClick,
  handleFolderOptionsClick,
  openToolList,
  handleFolderEditClick,
}) {
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
        {openToolList === id && (
          <>
            <div
              className="folder-options"
              onClick={() => handleFolderEditClick(id)}
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div
              className="folder-options"
              // onClick={() => handleFolderDeleteClick(id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </>
        )}

        <div
          className="item-tools"
          onClick={() => handleFolderOptionsClick(id)}
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
      </div>
    </div>
  );
}
