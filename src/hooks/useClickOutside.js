import { useEffect, useRef } from "react";

function useClickOutside(ref, clickHandler) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      clickHandler();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("touchstart", handleClickOutside);
    // document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    //   document.addEventListener("touchstart", handleClickOutside);
    //   document.addEventListener("touchend", handleClickOutside);
    };
  }, [ref, clickHandler]);
}

export default useClickOutside;
