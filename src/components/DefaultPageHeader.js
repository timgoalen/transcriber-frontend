import { useState } from "react";

import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

import HeaderBtn from "./HeaderBtn";
import HeaderLink from "./HeaderLink";
import LogInMenu from "./LogInMenu";

export default function HomePageHeader() {
  const [showLogInMenu, setShowLogInMenu] = useState(false);

  function toggleLogInMenu() {
    setShowLogInMenu((prevState) => !prevState);
  }

  return (
    <>
      <header>
        <h1>transcriber</h1>
        <div className="header-icons-container">
          <HeaderBtn
            onClick={toggleLogInMenu}
            ariaLabel="Account"
            icon={faUser}
          />
          <HeaderLink linkTo="/inbox" icon={faListUl} />
        </div>
      </header>

      {showLogInMenu && <LogInMenu />}
    </>
  );
}
