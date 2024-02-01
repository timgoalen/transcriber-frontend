import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "../../context/UserContext";
import LogInMenu from "../LogInMenu";

export default function Account() {
  const [showLogInMenu, setShowLogInMenu] = useState(false);
  const { isLoggedIn } = useContext(UserContext);

  function toggleLogInMenu() {
    setShowLogInMenu((prevState) => !prevState);
  }

  return (
    <>
      <button
        className="header-btn-container"
        aria-label="Account"
        onClick={toggleLogInMenu}
      >
        <FontAwesomeIcon icon={faUser} />
        {isLoggedIn ? (
          <div className="header-btn-text">log out</div>
        ) : (
          <div className="header-btn-text">log in</div>
        )}
      </button>

      {showLogInMenu && <LogInMenu setShowLogInMenu={setShowLogInMenu} />}
    </>
  );
}
