import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import PageMenu from "./PageMenu";

function MenuNavBtn({ onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="header-btn-container"
      aria-label="Menu"
    >
      <FontAwesomeIcon icon={icon} />
      <div className="header-btn-text">menu</div>
    </button>
  );
}

/**
 * Renders a toggle button and a dropdown menu for navigation actions.
 */
export default function MenuNav() {
  const [showNavMenu, setShowNavMenu] = useState(false);

  return showNavMenu ? (
    <>
      <MenuNavBtn icon={faEllipsisVertical} />

      {/* Nav dropdown menu */}
      <PageMenu setShowNavMenu={setShowNavMenu} />
    </>
  ) : (
    <MenuNavBtn icon={faEllipsis} onClick={() => setShowNavMenu(true)} />
  );
}
