import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonOffOutlined from "@mui/icons-material/PersonOffOutlined";

export default function HeaderBtn({ onClick, ariaLabel, icon }) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="header-btn-container">
      <button
        className="btn-container"
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {isLoggedIn ? (
          <FontAwesomeIcon icon={icon} />
        ) : (
          <PersonOffOutlined style={{ fontSize: "1.6rem" }} />
        )}
      </button>
    </div>
  );
}
