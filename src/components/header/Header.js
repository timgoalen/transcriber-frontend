import { useState } from "react";

import { faMagnifyingGlass, faListUl } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

import AccountNav from "./AccountNav";
import MenuNav from "./MenuNav";
import NavItem from "./NavItem";
import HomeNav from "./HomeNav";

export default function Header({ pageTitle }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <h1>{pageTitle}</h1>
      <nav className="header-icons-container">
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
