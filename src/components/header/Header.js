import { useState, useEffect } from "react";

import { faMagnifyingGlass, faListUl } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

import AccountNav from "./AccountNav";
import MenuNav from "./MenuNav";
import NavItem from "./NavItem";
import HomeNav from "./HomeNav";

export default function Header({ pageTitle }) {
  const [showMenu, setShowMenu] = useState(false);
  const [style, setStyle] = useState({
    header: { justifyContent: "space-between" },
    h1: { display: "block" },
    nav: { className: "header-icons-container" },
  });

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth <= 600) {
        setStyle({
          header: { justifyContent: showMenu ? "flex-end" : "space-between" },
          h1: { display: showMenu ? "none" : "block" },
          nav: {
            className: showMenu
              ? "header-icons-container-sm-devices"
              : "header-icons-container",
          },
        });
      }
    };

    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [showMenu]);

  return (
    <header style={style.header}>
      <h1 style={style.h1}>{pageTitle}</h1>
      <nav className={style.nav.className}>
        {showMenu && (
          <>
            <HomeNav />
            <NavItem link="/search" icon={faMagnifyingGlass} title="search" />
            <NavItem link="/folders" icon={faFolder} title="folders" />
            <NavItem link="/inbox" icon={faListUl} title="inbox" />
          </>
        )}

        <MenuNav showMenu={showMenu} setShowMenu={setShowMenu} />
        <AccountNav />
      </nav>
    </header>
  );
}
