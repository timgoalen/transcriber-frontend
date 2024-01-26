import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import HeaderLink from "../components/HeaderLink";

export default function Inbox() {
  return (
    <header>
      <h1>inbox</h1>
      <div className="header-icons-container">
        <HeaderLink linkTo="/" icon={faHouse} />
        <HeaderLink linkTo="/search" icon={faMagnifyingGlass} />
        <HeaderLink linkTo="/folders" icon={faFolder} />
      </div>
    </header>
  );
}
