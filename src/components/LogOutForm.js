import { useState } from "react";
import axios from "axios";

export default function LogOutForm({ userToken, saveUserToken }) {
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
      localStorage.removeItem("userToken");
      saveUserToken("");
      //   Refresh the page to clear the Notes and Folders data in state
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return <button onClick={submitLogOutRequest}>Log Out</button>;
}
