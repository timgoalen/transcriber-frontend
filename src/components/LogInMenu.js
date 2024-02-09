import { useContext, useRef } from "react";

import {
  faArrowUpFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import LogOut from "./LogOut";
import LogInMenuItem from "./LogInMenuItem";
import { UserContext } from "../context/UserContext";
import useClickOutside from "../hooks/useClickOutside";

export default function LogInMenu({ setShowLogInMenu }) {
  const { isLoggedIn, userName } = useContext(UserContext);
  const ref = useRef(null);

  function handleClickOutside() {
    setShowLogInMenu(false);
  }

  useClickOutside(ref, handleClickOutside);

  return (
    <div className="login-menu" ref={ref}>
      {isLoggedIn ? (
        <>
          <div className="login-menu-item">Hi, {userName}!</div>
          <hr></hr>
          <LogOut setShowLogInMenu={setShowLogInMenu} />
        </>
      ) : (
        <>
          <LogInMenuItem
            linkTo="/login"
            name="Log In"
            icon={faArrowUpFromBracket}
          />
          <hr></hr>
          <LogInMenuItem linkTo="/signup" name="Sign Up" icon={faPlus} />
        </>
      )}
    </div>
  );
}
