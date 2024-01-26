import HomePageHeader from "../components/HomePageHeader";
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
