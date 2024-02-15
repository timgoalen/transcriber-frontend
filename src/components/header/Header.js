import { useState } from "react";

import AccountNav from "./AccountNav";
import CreateNav from "./CreateNav";
import MenuNav from "./MenuNav";
import InboxNav from "./InboxNav";
import FoldersNav from "./FoldersNav";
import SearchNav from "./SearchNav";

export default function Header({ pageTitle, children }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <h1>{pageTitle}</h1>
      <nav className="header-icons-container">
        {/* {children} */}

        {showMenu && (
          <>
            <CreateNav />
            <InboxNav />
            <FoldersNav />
            <SearchNav />
          </>
        )}

        <MenuNav showMenu={showMenu} setShowMenu={setShowMenu} />
        <AccountNav />
      </nav>
    </header>
  );
}
