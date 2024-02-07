export default function Header({ pageTitle, children }) {
  return (
    <>
      <header>
        <h1>{pageTitle}</h1>
        <nav className="header-icons-container">{children}</nav>
      </header>
    </>
  );
}
