import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogInMenuItem({ linkTo, name, icon }) {
  return (
    <Link to={linkTo} className="login-menu-item">
      <FontAwesomeIcon icon={icon} />
      {name}
    </Link>
  );
}
