import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Displays a Log In menu item.
 */
export default function LogInMenuItem({ linkTo, name, icon, onClick }) {
  return (
    <Link to={linkTo} className="menu-item" onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
      {name}
    </Link>
  );
}
