import { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import LogInMenu from "../LogInMenu";
import { UserContext } from "../../context/UserContext";

function AccountNavBtn({ onClick }) {
  const { isLoggedIn } = useContext(UserContext);
  const label = isLoggedIn ? "user" : "log in";

  return (
    <button
      className="header-btn-container"
      aria-label="Account"
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faUser} />
      <div className="header-btn-text">{label}</div>
    </button>
  );
}

export default function AccountNav() {
  const [showLogInMenu, setShowLogInMenu] = useState(false);

  return (
    <>
      {!showLogInMenu ? (
        <AccountNavBtn onClick={() => setShowLogInMenu(true)} />
      ) : (
        <>
          {/* No onClick function, to get around useClickOutside conflict */}
          <AccountNavBtn />

          <LogInMenu setShowLogInMenu={setShowLogInMenu} />
        </>
      )}
    </>
  );
}
