import { useEffect } from "react";

export default function SpeechRecognition({
  setTextFromSpeechRecognition,
  isRecording,
  textInput,
}) {
  useEffect(() => {
    try {
      var SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      console.log("speech recognisiotn initialized");
    } catch (e) {
      alert(
        "Your browser doesn't support speech recognition. Try using Chrome or Safari."
      );
    }

    try {
      var recognition = new SpeechRecognition();
      console.log("speech recognisiotn declared");
    } catch (e) {
      alert(
        "Your browser doesn't support speech recognition. Try using Chrome or Safari."
      );
    }
  }, []);

  console.log("module works! rendered");

  if (isRecording) {
    // const existingText = prevTextInput;
    // setTextFromSpeechRecognition("!");
    // alert(existingText + "!");
  }
}
