import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

import axios from "axios";

import CloseAuthFormsBtn from "./CloseAuthFormsBtn.js";

export default function LogInForm() {
  const { updateUserToken } = useContext(UserContext);
  const navigateToHomePage = useNavigate();
  const [errors, setErrors] = useState({});

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
      updateUserToken(logInResponseToken);
      navigateToHomePage("/");
    } catch (error) {
      console.error("Error logging in to retreive token:", error.message);
      console.error(error);
      setErrors(error.response?.data);
    }
  }

  return (
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
          {errors.username?.map((message, index) => (
            <p className="form-error-message" key={index}>
              {message}
            </p>
          ))}

          <label htmlFor="password">password</label>
          <input
            type="password"
            value={logInFormData.password}
            onChange={handleFormChange}
            id="password"
            name="password"
            autoComplete="password"
          ></input>
          {errors.password?.map((message, index) => (
            <p className="form-error-message" key={index}>
              {message}
            </p>
          ))}

          {errors.non_field_errors?.map((message, index) => (
            <p className="form-error-message" key={index}>
              {message}
            </p>
          ))}
        </div>

        {/* Submit button */}
        <div className="auth-form-btn-container">
          <button onClick={submitLogInForm}>Log In</button>
        </div>

        {/* Close button */}
        <CloseAuthFormsBtn
          onClick={(event) => {
            event.preventDefault();
            navigateToHomePage("/");
          }}
        />
      </form>
    </section>
  );
}
