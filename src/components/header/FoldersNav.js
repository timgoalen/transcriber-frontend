import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

export default function FoldersNav() {
  return (
    <NavLink
      to="/folders"
      className="header-btn-container"
      activeClassName="active"
    >
      <FontAwesomeIcon icon={faFolder} />
      <div className="header-btn-text">folders</div>
    </NavLink>
  );
}
