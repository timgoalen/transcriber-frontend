import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogOut() {
  const { updateUserToken, userToken } = useContext(UserContext);
  const navigateToHomePage = useNavigate();

  async function submitLogOutRequest(event) {
    try {
      // TODO: change URL to a variable
      const logOutResponse = await axios.post(
        "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/api/auth/logout/",
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.info(logOutResponse.data);
      // Remove the token from state (context) and local storage
      updateUserToken("");
    } catch (error) {
      console.error("Error logging out:", error.message);
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
