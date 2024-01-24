import {
  faChevronLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";

export default function SearchBar({
  searchTerms,
  setSearchTerms,
  handleSearchInputChange,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchBarRef = useRef(null);
  const searchIconRef = useRef(null);

  return (
    <>
      {isSearchOpen ? (
        <>
          <input
            type="search"
            value={searchTerms}
            onChange={handleSearchInputChange}
            placeholder="Search notes.."
            className="list-page-item"
            id="search"
            autocomplete="off"
          ></input>
          <span
            onClick={() => {
              setIsSearchOpen(false);
              setSearchTerms("");
            }}
            className="search-bar-close-icon"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
        </>
      ) : (
        <div className="search-icon-container">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={() => setIsSearchOpen(true)}
            className="list-page-item"
            id="search-icon"
          />
        </div>
      )}
    </>
  );
}
