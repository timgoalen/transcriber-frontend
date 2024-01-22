import { useState } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogOutBtn({
  userToken,
  saveUserToken,
  toggleLogInMenu,
}) {
  async function submitLogOutRequest(event) {
    try {
      event.preventDefault();
      // TODO: change URL to a variable
      const logOutResponse = await axios.post(
        "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/api/auth/logout/",
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.info(logOutResponse.data);
      //   Remove the token from local storage
      localStorage.removeItem("userToken");
      //   Remove the token from state
      saveUserToken("");
      //   Refresh the page to clear the Notes and Folders data in state
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div
      className="login-menu-item"
      onClick={() => {
        submitLogOutRequest();
        toggleLogInMenu();
      }}
    >
      <FontAwesomeIcon icon={faArrowRightToBracket} />
      <button>Log Out</button>
    </div>
  );
}
