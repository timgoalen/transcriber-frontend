import { useState } from "react";

import axios from "axios";

import CloseAuthFormsBtn from "./CloseAuthFormsBtn.js";

export default function SignUpForm({
  saveUserToken,
  saveTokenToLocalStorage,
  getInitialNotesDataFromApi,
  getInitialFoldersDataFromApi,
  setDisplayPageChoice,
}) {
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
        // getInitialNotesDataFromApi();
        // getInitialFoldersDataFromApi();
        // TODO: change this hack to get data to reload into state on log in****
        window.location.reload();
      } catch (error) {
        console.error("Error logging in to retreive token:", error.message);
      }
    } catch (error) {
      console.error("Error submitting Sign Up Form:", error.message);
    }
  }

  return (
    <main id="main-container">
      <section className="auth-form-container">
        <form className="auth-form">
          <h2>sign up</h2>

          <div className="auth-form-fields">
            <label htmlFor="username">username</label>
            <input
              type="text"
              value={signUpFormData.username}
              onChange={handleFormChange}
              id="username"
              name="username"
              autoComplete="username"
            ></input>
            <label htmlFor="password1">password</label>
            <input
              type="password"
              value={signUpFormData.password1}
              onChange={handleFormChange}
              id="password1"
              name="password1"
              autoComplete="new-password"
            ></input>
            <label htmlFor="password2">confirm password</label>
            <input
              type="password"
              value={signUpFormData.password2}
              onChange={handleFormChange}
              id="password2"
              name="password2"
              autoComplete="new-password"
            ></input>
          </div>

          <div className="auth-form-btn-container">
            <button onClick={submitSignUpForm}>Sign Up</button>
          </div>

          <CloseAuthFormsBtn onClick={() => setDisplayPageChoice("create")} />
        </form>
      </section>
    </main>
  );
}
