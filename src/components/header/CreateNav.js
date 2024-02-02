import { Link } from "react-router-dom";
import MicrophoneIcon from "../../assets/custom_icons/MicrophoneIcon";

export default function Create() {
  return (
    <Link to="/" className="header-btn-container">
      <MicrophoneIcon />
      <div className="header-btn-text">home</div>
    </Link>
  );
}
