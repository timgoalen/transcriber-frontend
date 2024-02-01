import Header from "../components/header/Header";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <>
      <Header pageTitle="transcriber"></Header>

      <main id="main-container">
        <SignUpForm />
      </main>
    </>
  );
}
