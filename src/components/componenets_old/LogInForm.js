import { useState } from "react";

import axios from "axios";

import CloseAuthFormsBtn from "./CloseAuthFormsBtn.js";

export default function LogInForm({
  saveUserToken,
  saveTokenToLocalStorage,
  getInitialNotesDataFromApi,
  getInitialFoldersDataFromApi,
  setDisplayPageChoice,
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
        "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/api/auth/login/",
        {
          username: logInFormData.username,
          password: logInFormData.password,
        }
      );
      console.log("Login successful:", logInResponse.data);
      const logInResponseToken = logInResponse.data.key;
      saveUserToken(logInResponseToken);
      saveTokenToLocalStorage(logInResponseToken);
      //   getInitialNotesDataFromApi();
      //   getInitialFoldersDataFromApi();
      // TODO: change this hack to get data to reload into state on log in****
      window.location.reload();
    } catch (error) {
      console.error("Error logging in to retreive token:", error.message);
    }
  }

  return (
    <main id="main-container">
      <section className="auth-form-container">
        <form className="auth-form">
          <h2>log in</h2>

          <div className="auth-form-fields">
            <label htmlFor="username">username</label>
            <input
              type="text"
              value={logInFormData.username}
              onChange={handleFormChange}
              id="username"
              name="username"
              autoComplete="username"
            ></input>
            <label htmlFor="password">password</label>
            <input
              type="password"
              value={logInFormData.password}
              onChange={handleFormChange}
              id="password"
              name="password"
              autoComplete="password"
            ></input>
          </div>

          <div className="auth-form-btn-container">
            <button onClick={submitLogInForm}>Log In</button>
          </div>

          <CloseAuthFormsBtn onClick={() => setDisplayPageChoice("create")} />
        </form>
      </section>
    </main>
  );
}
