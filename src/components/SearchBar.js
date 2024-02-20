import styles from "../styles/SearchBar.module.css";

/**
 * Renders a Search input.
 */
export default function SearchBar({ searchTerms, handleSearchInputChange }) {
  return (
    <input
      autoFocus
      type="search"
      value={searchTerms}
      onChange={handleSearchInputChange}
      placeholder="Notes & folders.."
      className={`list-page-item ${styles.SearchInput}`}
      autoComplete="off"
    ></input>
  );
}
