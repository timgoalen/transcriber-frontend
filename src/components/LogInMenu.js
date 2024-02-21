import { useContext, useRef } from "react";

import { motion } from "framer-motion";
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
    <motion.div
      className={styles.LoginMenu}
      ref={ref}
      transition={{ duration: 0.1 }}
      initial={{ y: -10, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {isLoggedIn ? (
        <>
          <div className="menu-item">Hi, {userName}!</div>
          <hr></hr>
          <LogOut setShowLogInMenu={setShowLogInMenu} />
        </>
      ) : (
        <>
          <LogInMenuItem
            linkTo="/login"
            name="Log In"
            icon={faArrowUpFromBracket}
            // This extra onClick closes the menu if active item is clicked again
            onClick={() => setShowLogInMenu(false)}
          />
          <hr></hr>
          <LogInMenuItem
            linkTo="/signup"
            name="Sign Up"
            icon={faPlus}
            onClick={() => setShowLogInMenu(false)}
          />
        </>
      )}
    </motion.div>
  );
}
