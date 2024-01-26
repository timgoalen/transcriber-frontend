import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HeaderLink({ linkTo, icon }) {
  return (
    <div className="header-btn-container">
      <Link to={linkTo}>
        <FontAwesomeIcon icon={icon} />
      </Link>
    </div>
  );
}
