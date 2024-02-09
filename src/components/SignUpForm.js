import { useContext, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import CloseAuthFormsBtn from "./CloseAuthFormsBtn";
import { baseApiUrl } from "../constants/apiConstants";

export default function SignUpForm() {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { updateUserToken } = useContext(UserContext);
  const navigateToHomePage = useNavigate();

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
    setIsLoading(true);
    console.log("sending signup form");
    try {
      // Register a new user
      await axios.post(`${baseApiUrl}api/auth/register/`, signUpFormData);
      try {
        // Obtain the authorisation token by logging in the user
        const logInResponse = await axios.post(`${baseApiUrl}api/auth/login/`, {
          username: signUpFormData.username,
          password: signUpFormData.password1,
        });
        const logInResponseToken = logInResponse.data.key;
        updateUserToken(logInResponseToken);
        navigateToHomePage("/", {
          state: { message: `Hi, ${signUpFormData.username}!` },
        });
      } catch (error) {
        console.error(`Error logging in: ${error.message}`);
        setErrors(error.response?.data);
      }
    } catch (error) {
      console.error(`Error submitting Sign Up Form: ${error.message}`);
      setErrors(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
          {errors.username?.map((message, index) => (
            <p className="form-error-message" key={index}>
              {message}
            </p>
          ))}

          <label htmlFor="password1">password</label>
          <input
            type="password"
            value={signUpFormData.password1}
            onChange={handleFormChange}
            id="password1"
            name="password1"
            autoComplete="new-password"
          ></input>
          {errors.password1?.map((message, index) => (
            <p className="form-error-message" key={index}>
              {message}
            </p>
          ))}

          <label htmlFor="password2">confirm password</label>
          <input
            type="password"
            value={signUpFormData.password2}
            onChange={handleFormChange}
            id="password2"
            name="password2"
            autoComplete="new-password"
          ></input>
          {errors.password2?.map((message, index) => (
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
          <button onClick={submitSignUpForm}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
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
