import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

import HeaderBtn from "../components/HeaderBtn";
import HeaderLink from "../components/HeaderLink";

export default function Transcriber() {
  return (
    <>
      <header>
        <h1>transcriber</h1>
        <div className="header-icons-container">
          <HeaderBtn
            onClick={() => alert("open account box")}
            ariaLabel="Account"
            icon={faUser}
          />
          <HeaderLink linkTo="/inbox" icon={faListUl} />
        </div>
      </header>

      {/* <Link to="/">home</Link>
      <Link to="/inbox">inbox</Link>
      <Link to="/folders">folders</Link>
      <Link to="/update">update</Link>
      <Link to="/signup">sign up</Link>
      <Link to="/login">log in</Link> */}
    </>
  );
}
