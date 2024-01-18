import { useState } from "react";
import axios from "axios";

export default function LogInForm({
  saveUserToken,
  saveTokenToLocalStorage,
  getInitialNotesDataFromApi,
  getInitialFoldersDataFromApi,
}) {
  const [logInFormData, setLogInFormData] = useState({
    username: "",
    password: "",
  });

  function handleFormChange(event) {
    const changedFormField = event.target.name;
    const newFieldValue = event.target.value;
    setLogInFormData((prevData) => {
      return {
        ...prevData,
        [changedFormField]: newFieldValue,
      };
    });
  }

  async function submitLogInForm(event) {
    event.preventDefault();
    console.log("sending log in form");
    try {
      // Obtain the authorisation token by logging in the user
      const logInResponse = await axios.post(
        "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/api/auth/login/",
        {
          username: logInFormData.username,
          password: logInFormData.password,
        }
      );
      console.log("Login successful:", logInResponse.data);
      const logInResponseToken = logInResponse.data.key;
      saveUserToken(logInResponseToken);
      saveTokenToLocalStorage(logInResponseToken);
      getInitialNotesDataFromApi();
      getInitialFoldersDataFromApi();
    } catch (error) {
      console.error("Error logging in to retreive token:", error.message);
    }
  }

  return (
    <form>
      <h2>Log In</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        value={logInFormData.username}
        onChange={handleFormChange}
        placeholder="username"
        id="username"
        name="username"
        autoComplete="username"
      ></input>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={logInFormData.password}
        onChange={handleFormChange}
        placeholder="password"
        id="password"
        name="password"
        autoComplete="password"
      ></input>

      <button onClick={submitLogInForm}>Log In</button>
    </form>
  );
}
