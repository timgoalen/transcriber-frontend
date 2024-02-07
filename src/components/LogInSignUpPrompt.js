import { Link } from "react-router-dom";

import CloseAuthFormsBtn from "./CloseAuthFormsBtn";

export default function LogInSignUpPrompt({
  userAttempedAction,
  setShowLogInSignUpPrompt,
}) {
  return (
    <section className="login-prompt-modal-container">
      <div className="login-prompt-modal-content">
        <p className="login-prompt-modal-text">
          please <Link to="/login">Log In</Link> or{" "}
          <Link to="/signup">Sign Up</Link> to {userAttempedAction}
        </p>

        <CloseAuthFormsBtn
          onClick={() => {
            setShowLogInSignUpPrompt(false);
          }}
        />
      </div>
    </section>
  );
}
