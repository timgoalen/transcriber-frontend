import Header from "../components/header/Header.js";

/**
 * Renders the 404 Page.
 */
export default function NoPage() {
  return (
    <>
      <Header pageTitle="transcriber" />

      <main>
        <section className="list-page-main auth-form-container">
          <h2>404 Error: page not found</h2>
        </section>
      </main>
    </>
  );
}
