import { useEffect } from "react";

/**
 * Handles data sent from the previous page.
 */
export default function usePrevLocationNotification(
  passedMessage,
  setMessageFromPrevLocation
) {
  useEffect(() => {
    if (passedMessage) {
      setMessageFromPrevLocation(passedMessage);

      const timeoutId = setTimeout(() => {
        setMessageFromPrevLocation("");
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [passedMessage, setMessageFromPrevLocation]);
}
