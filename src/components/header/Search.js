import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
  return (
    <Link to="/search" className="header-btn-container">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <div className="header-btn-text">search</div>
    </Link>
  );
}
