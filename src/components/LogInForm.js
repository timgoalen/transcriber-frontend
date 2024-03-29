import { useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import CloseBtn from "./CloseBtn.js";
import { UserContext } from "../context/UserContext.js";
import { baseApiUrl } from "../constants/apiConstants";

/**
 * Handles user login and displays error messages if present.
 */
export default function LogInForm() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserToken } = useContext(UserContext);
  const navigateToHomePage = useNavigate();

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

  /**
   * Handles login form submission, sending details to the API, and updates the UI.
   */
  async function submitLogInForm(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      // Obtain the authorisation token by logging in the user
      const logInResponse = await axios.post(`${baseApiUrl}api/auth/login/`, {
        username: logInFormData.username,
        password: logInFormData.password,
      });
      const logInResponseToken = logInResponse.data.key;
      updateUserToken(logInResponseToken);
      navigateToHomePage("/", {
        state: { message: `Hi, ${logInFormData.username}!` },
      });
    } catch (error) {
      console.error(`Error logging in: ${error.message}`);
      setErrors(error.response?.data);
    } finally {
      setIsLoading(false);
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
          <button onClick={submitLogInForm}>
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </div>

        {/* Close button */}
        <CloseBtn
          onClick={(event) => {
            event.preventDefault();
            navigateToHomePage("/");
          }}
        />
      </form>
    </section>
  );
}
