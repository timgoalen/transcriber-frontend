import { useEffect } from "react";

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
