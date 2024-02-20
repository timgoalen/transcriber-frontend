import { useContext, useRef } from "react";

import {
  faArrowUpFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/LogInMenu.module.css";
import LogOut from "./LogOut";
import LogInMenuItem from "./LogInMenuItem";
import { UserContext } from "../context/UserContext";
import useClickOutside from "../hooks/useClickOutside";

/**
 * Renders a menu with Login or Signup options based on user authentication state.
 */
export default function LogInMenu({ setShowLogInMenu }) {
  const { isLoggedIn, userName } = useContext(UserContext);
  const ref = useRef(null);

  function handleClickOutside() {
    setShowLogInMenu(false);
  }

  useClickOutside(ref, handleClickOutside);

  return (
    <div className={styles.LoginMenu} ref={ref}>
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
