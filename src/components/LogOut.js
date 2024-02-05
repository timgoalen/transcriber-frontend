import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { baseApiUrl } from "../constants/apiConstants";

export default function LogOut({ setShowLogInMenu }) {
  const { updateUserToken, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const navigateToHomePage = useNavigate();

  async function submitLogOutRequest(event) {
    try {
      const logOutResponse = await axios.post(
        `${baseApiUrl}api/auth/logout/`,
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.info(logOutResponse.data);
      // Remove the token from state (context) and local storage
      updateUserToken("");
      addToMessages("sucessfully logged out");
      setShowLogInMenu(false);
    } catch (error) {
      console.error(`Error logging out: ${error.message}`);
      addToMessages("error logging out");
    }
  }

  return (
    <>
      <div
        className="login-menu-item"
        onClick={() => {
          submitLogOutRequest();
          navigateToHomePage("/");
        }}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} />
        <button>Log Out</button>
      </div>
    </>
  );
}
