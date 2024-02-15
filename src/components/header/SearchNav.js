import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchNav() {
  return (
    <NavLink
      to="/search"
      className="header-btn-container"
      activeClassName="active"
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <div className="header-btn-text">search</div>
    </NavLink>
  );
}
