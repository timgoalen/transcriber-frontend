import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faEllipsis, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function MenuNav({ showMenu, setShowMenu }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenuOpen() {
    setShowMenu(!showMenu);
    setMenuOpen(!menuOpen);
  }

  return (
    <button
      className="header-btn-container"
      aria-label="Menu"
      onClick={toggleMenuOpen}
    >
      {menuOpen ? (
        <FontAwesomeIcon icon={faEllipsisVertical} />
      ) : (
        <>
          <FontAwesomeIcon icon={faEllipsis} />
          <div className="header-btn-text">menu</div>
        </>
      )}
    </button>
  );
}
