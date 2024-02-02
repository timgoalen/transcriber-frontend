import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function Create() {
  return (
    <Link to="/" className="header-btn-container">
      <FontAwesomeIcon icon={faMicrophone} />
      <div className="header-btn-text">home</div>
    </Link>
  );
}
