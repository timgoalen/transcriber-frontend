export default function Header({ pageTitle, children }) {
  return (
    <>
      <header>
        <h1>{pageTitle}</h1>
        <div className="header-icons-container">{children}</div>
      </header>
    </>
  );
}
