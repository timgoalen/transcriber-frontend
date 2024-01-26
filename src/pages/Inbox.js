import { Link } from "react-router-dom";

import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// import { ArrowRight, CameraIcon } from '@mui/icons-material';

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import HeaderLink from "../components/HeaderLink";

export default function Inbox() {
  return (
    <header>
      <h1>inbox</h1>
      <div className="header-icons-container">
        <div className="header-btn-container">
          <Link to="/">
            <HomeOutlinedIcon />
          </Link>
        </div>
        <HeaderLink linkTo="/search" icon={faMagnifyingGlass} />
        <HeaderLink linkTo="/folders" icon={faFolder} />
      </div>
    </header>
  );
}
