import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

export default function InboxNav() {
  return (
    <NavLink
      to="/inbox"
      className="header-btn-container"
      activeClassName="active"
    >
      <FontAwesomeIcon icon={faListUl} />
      <div className="header-btn-text">inbox</div>
    </NavLink>
  );
}
