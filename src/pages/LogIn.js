import Header from "../components/header/Header";
import LogInForm from "../components/LogInForm";

export default function LogIn() {
  return (
    <>
      <Header pageTitle="transcriber" />

      <main id="main-container">
        <LogInForm />
      </main>
    </>
  );
}
