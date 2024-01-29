import HomePageHeader from "../components/DefaultPageHeader";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
  return (
    <>
      <HomePageHeader />

      <main id="main-container">
        <SignUpForm />
      </main>

      {/* <footer className="toolbar">FOOTER</footer> */}
    </>
  );
}
