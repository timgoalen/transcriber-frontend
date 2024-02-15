import { NavLink } from "react-router-dom";

import MicrophoneIcon from "../../assets/custom_icons/MicrophoneIcon";

export default function CreateNav() {
  return (
    <NavLink to="/" className="header-btn-container" activeClassName="active">
      <MicrophoneIcon />
      <div className="header-btn-text">home</div>
    </NavLink>
  );
}
