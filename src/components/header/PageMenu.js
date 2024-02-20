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
      <NavItem link="/" icon={faMicrophone} label="home" />
      <hr></hr>
      <NavItem link="/inbox" icon={faListUl} label="inbox" />
      <hr></hr>
      <NavItem link="/folders" icon={faFolder} label="folders" />
      <hr></hr>
      <NavItem link="/search" icon={faMagnifyingGlass} label="search" />
    </nav>
  );
}
