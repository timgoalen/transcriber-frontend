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
  return (
    <input
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
