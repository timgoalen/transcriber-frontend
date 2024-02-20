import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Renders a navigation button with icon and label.
 */
export default function NavItem({ link, icon, label, onClick }) {
  return (
    <NavLink to={link} className="menu-item" activeclassname="active" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {label}
    </NavLink>
  );
}
