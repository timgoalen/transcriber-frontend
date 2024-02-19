import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavItem({ link, icon, title }) {
  return (
    <NavLink
      to={link}
      className="header-btn-container"
      activeclassname="active"
    >
      <FontAwesomeIcon icon={icon} />
      <div className="header-btn-text">{title}</div>
    </NavLink>
  );
}
