import Header from "../components/header/Header";
import SignUpForm from "../components/SignUpForm";

/**
 * Renders the Sign Up Page.
 */
export default function SignUp() {
  return (
    <>
      <Header pageTitle="transcriber" />

      <main id="main-container">
        <SignUpForm />
      </main>
    </>
  );
}
