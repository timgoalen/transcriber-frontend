import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import Button from "./Button.js";
import LogOutBtn from "./LogOutBtn.js";

export default function Header({
  title,
  showUserIcon,
  showNavIcon,
  navIcon,
  onNavIconClick,
  isLoggedIn,
  showLogInForm,
  showSignUpForm,
  userToken,
  saveUserToken,
}) {
  const [showLogInMenu, setShowLogInMenu] = useState(false);

  function toggleLogInMenu() {
    setShowLogInMenu((prevState) => !prevState);
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        <div className="header-icons-container">
          {/* User log in menu */}
          {showUserIcon && (
            <div className="list-view-btn-container">
              <Button icon={faUser} onClick={toggleLogInMenu} ariaLabel="User Account"/>
            </div>
          )}
          {/* Navigation */}
          {showNavIcon && (
            <div className="list-view-btn-container">
              <Button
                icon={navIcon}
                ariaLabel="Inbox"
                onClick={() => {
                  onNavIconClick();
                  setShowLogInMenu(false);
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Dropdown menu */}
      {showLogInMenu && (
        <div className="login-menu">
          {isLoggedIn ? (
            <LogOutBtn
              toggleLogInMenu={toggleLogInMenu}
              userToken={userToken}
              saveUserToken={saveUserToken}
            />
          ) : (
            <>
              <div
                className="login-menu-item"
                onClick={() => {
                  showLogInForm();
                  toggleLogInMenu();
                }}
              >
                <FontAwesomeIcon icon={faArrowRightToBracket} />
                <button>Log In</button>
              </div>
              <hr></hr>
              <div
                className="login-menu-item"
                onClick={() => {
                  showSignUpForm();
                  toggleLogInMenu();
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                <button>Sign Up</button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
