import { useState } from "react";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogOutBtn({
  userToken,
  saveUserToken,
  toggleLogInMenu,
}) {
  const [username, setUsername] = useState("");

  async function getUsername() {
    try {
      const usernameResponse = await axios.get(
        "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/users/",
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      const username = await usernameResponse.data[0].username;
      setUsername(username);
    } catch (error) {
      console.error("Error retrieving username:", error.message);
    }
  }

  getUsername();

  async function submitLogOutRequest(event) {
    try {
      // event.preventDefault();
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
    <>
      <div className="login-menu-item" id="username">Hi, {username}!</div>
      <hr></hr>
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
    </>
  );
}
