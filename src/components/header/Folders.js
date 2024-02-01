import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

export default function Folders() {
  return (
    <Link to="/folders" className="header-btn-container">
      <FontAwesomeIcon icon={faFolder} />
      <div className="header-btn-text">folders</div>
    </Link>
  );
}
