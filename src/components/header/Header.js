import AccountNav from "./AccountNav";
import MenuNav from "./MenuNav";

/**
 * Displays the page header.
 */
export default function Header({ pageTitle }) {
  return (
    <header>
      <h1>{pageTitle}</h1>

      <div className="header-icons-container">
        <MenuNav />
        <AccountNav />
      </div>
    </header>
  );
}
