import { useState } from "react";
import axios from "axios";

export default function SignUpForm({ saveUserToken, getInitialNotesDataFromApi, getInitialFoldersDataFromApi }) {
  const [signUpFormData, setSignUpFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  function handleFormChange(event) {
    const changedFormField = event.target.name;
    const newFieldValue = event.target.value;
    setSignUpFormData((prevData) => {
      return {
        ...prevData,
        [changedFormField]: newFieldValue,
      };
    });
  }

  function saveTokenToLocalStorage(token) {
    localStorage.setItem("userToken", token);
  }

  async function submitSignUpForm(event) {
    event.preventDefault();
    console.log("sending signup form");
    try {
      // Register a new user
      await axios.post(
        "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/api/auth/register/",
        signUpFormData
      );
      try {
        // Obtain the authorisation token by logging in the user
        const logInResponse = await axios.post(
          "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/api/auth/login/",
          {
            username: signUpFormData.username,
            password: signUpFormData.password1,
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
    } catch (error) {
      console.error("Error submitting Sign Up Form:", error.message);
    }
  }

  return (
    <form>
      <h2>Sign Up</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        value={signUpFormData.username}
        onChange={handleFormChange}
        placeholder="username"
        id="username"
        name="username"
        autoComplete="username"
      ></input>
      <label htmlFor="password1">Password</label>
      <input
        type="password"
        value={signUpFormData.password1}
        onChange={handleFormChange}
        placeholder="password"
        id="password1"
        name="password1"
        autoComplete="new-password"
      ></input>
      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        value={signUpFormData.password2}
        onChange={handleFormChange}
        placeholder="confirm password"
        id="password2"
        name="password2"
        autoComplete="new-password"
      ></input>

      <button onClick={submitSignUpForm}>Sign Up</button>
    </form>
  );
}
