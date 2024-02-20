import { useRef } from "react";

import {
  faMagnifyingGlass,
  faListUl,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

import styles from "../../styles/PageMenu.module.css";
import useClickOutside from "../../hooks/useClickOutside";
import NavItem from "./NavItem";

/**
 * Renders a dropdown list of navigation items.
 */
export default function PageMenu({ setShowNavMenu }) {
  const ref = useRef(null);

  function handleClickOutside() {
    setShowNavMenu(false);
  }

  useClickOutside(ref, handleClickOutside);

  return (
    <nav ref={ref} className={styles.PageMenu}>
      <NavItem
        link="/"
        icon={faMicrophone}
        label="home"
        // This extra onClick closes the menu if active item is clicked again
        onClick={() => setShowNavMenu(false)}
      />
      <hr></hr>
      <NavItem
        link="/inbox"
        icon={faListUl}
        label="inbox"
        onClick={() => setShowNavMenu(false)}
      />
      <hr></hr>
      <NavItem
        link="/folders"
        icon={faFolder}
        label="folders"
        onClick={() => setShowNavMenu(false)}
      />
      <hr></hr>
      <NavItem
        link="/search"
        icon={faMagnifyingGlass}
        label="search"
        onClick={() => setShowNavMenu(false)}
      />
    </nav>
  );
}
