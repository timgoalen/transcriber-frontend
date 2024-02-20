import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Renders a navigation button with icon and label.
 */
export default function NavItem({ link, icon, label }) {
  return (
    <NavLink to={link} className="menu-item" activeclassname="active">
      <FontAwesomeIcon icon={icon} />
      {label}
    </NavLink>
  );
}
