import axios from "axios";
import { useState } from "react";

export default function SignUpForm() {
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
      await axios.post(
        "https://8000-timgoalen-transcriberba-5uy4uhx3wov.ws-eu107.gitpod.io/api/auth/register/",
        signUpFormData
      );
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
      ></input>
      <label htmlFor="password1">Password</label>
      <input
        type="password"
        value={signUpFormData.password1}
        onChange={handleFormChange}
        placeholder="password"
        id="password1"
        name="password1"
      ></input>
      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        value={signUpFormData.password2}
        onChange={handleFormChange}
        placeholder="confirm password"
        id="password2"
        name="password2"
      ></input>

      <button onClick={submitSignUpForm}>Sign Up</button>
    </form>
  );
}
