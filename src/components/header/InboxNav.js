import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

export default function Inbox() {
  return (
    <Link to="/inbox" className="header-btn-container">
      <FontAwesomeIcon icon={faListUl} />
      <div className="header-btn-text">inbox</div>
    </Link>
  );
}
