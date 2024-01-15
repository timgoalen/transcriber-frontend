import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

import Button from "./Button.js";

export default function NewFolderBtn({ handleShowNewFolderBtnClick }) {
  return (
    <div className="new-folder-btn">
      <Button
        name="New Folder"
        icon={faSquarePlus}
        onClick={handleShowNewFolderBtnClick}
        className="new-folder-btn"
      />
    </div>
  );
}
