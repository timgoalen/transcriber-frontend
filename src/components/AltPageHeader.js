import { Link } from "react-router-dom";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import HeaderLink from "./HeaderLink";

export default function AltPageHeader({ title, cornerIcon, cornerIconLinkTo }) {
  return (
    <header>
      <h1>{title}</h1>
      <div className="header-icons-container">
        <HeaderLink linkTo="/search" icon={faMagnifyingGlass} />
        <div className="header-btn-container">
          <Link to="/" className="material-icon-link">
            <HomeOutlinedIcon style={{ fontSize: "1.8rem" }} />
          </Link>
        </div>
        <HeaderLink linkTo={cornerIconLinkTo} icon={cornerIcon} />
      </div>
    </header>
  );
}
