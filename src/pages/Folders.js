import { Link } from "react-router-dom";

import { faListUl, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import HeaderLink from "../components/HeaderLink";

export default function Folders() {
  return (
    <header>
      <h1>folders</h1>
      <div className="header-icons-container">
        <div className="header-btn-container">
          <Link to="/">
            <HomeOutlinedIcon />
          </Link>
        </div>
        <HeaderLink linkTo="/search" icon={faMagnifyingGlass} />
        <HeaderLink linkTo="/inbox" icon={faListUl} />
      </div>
    </header>
  );
}
