import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import { Link } from "react-router-dom";
import {
  faArrowUpFromBracket,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import LogOut from "./LogOut";
import LogInMenuItem from "./LogInMenuItem";

export default function LogInMenu() {
  const userData = useContext(UserContext);
  const isLoggedIn = userData.isLoggedIn;
  // console.log(userData.userToken);

  return (
    <div className="login-menu">
      {isLoggedIn ? (
        <>
          <div className="login-menu-item">TODO: username here</div>
          <hr></hr>
          <LogOut />
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
      {/* {isLoggedIn ? (
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
      )} */}
    </div>
  );
}
