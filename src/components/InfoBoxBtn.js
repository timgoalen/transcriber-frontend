import { useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

import styles from "../styles/InfoBoxBtn.module.css";
import CloseAuthFormsBtn from "./CloseAuthFormsBtn";
import useClickOutside from "../hooks/useClickOutside";

export default function InfoBoxBtn() {
  const [openInfoBox, setOpenInfoBox] = useState(false);
  const ref = useRef(null);

  function handleClickOutside() {
    setOpenInfoBox(false);
  }

  useClickOutside(ref, handleClickOutside);

  return openInfoBox ? (
    <div className={styles.Box} ref={ref}>
      <p>Tips:</p>
      <p>~ Click and hold the magic wand to open custom prompts.</p>
      <p>
        ~ Try using "full stop", "comma", "question mark" etc. while dictating a
        note.
      </p>
      <p>~ Try using "new paragraph" and "new line" while dictating a note.</p>

      <CloseAuthFormsBtn onClick={() => setOpenInfoBox(false)} />
    </div>
  ) : (
    <button
      className={styles.Btn}
      onClick={() => setOpenInfoBox(true)}
      aria-label="Info box button"
    >
      <FontAwesomeIcon icon={faInfo} />
    </button>
  );
}
