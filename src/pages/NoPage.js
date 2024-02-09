import Header from "../components/header/Header.js";
import CreateNav from "../components/header/CreateNav.js";

export default function NoPage() {
  return (
    <>
      <Header pageTitle="transcriber">
        <CreateNav />
      </Header>

      <main>
        <section className="list-page-main auth-form-container">
          <h2>404 Error: page not found</h2>
        </section>
      </main>
    </>
  );
}
