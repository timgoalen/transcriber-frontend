import HomePageHeader from "../components/DefaultPageHeader";
import LogInForm from "../components/LogInForm";

export default function LogIn() {
  return (
    <>
      <HomePageHeader />

      <main id="main-container">
        <LogInForm />
      </main>

      {/* <footer className="toolbar">FOOTER</footer> */}
    </>
  );
}
