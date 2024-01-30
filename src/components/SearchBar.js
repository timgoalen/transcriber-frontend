export default function SearchBar({ searchTerms, handleSearchInputChange }) {
  return (
    <input
      autoFocus
      type="search"
      value={searchTerms}
      onChange={handleSearchInputChange}
      placeholder="Notes & folders.."
      className="list-page-item"
      id="search"
      autoComplete="off"
    ></input>
  );
}
