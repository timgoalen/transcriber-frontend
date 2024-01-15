import { useEffect } from "react";

export default function SpeechRecognition({
  isRecording,
  setTextFromSpeechRecognition,
}) {
  let recognition;
  let SpeechRecognition;

  useEffect(() => {
    try {
      SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
    } catch (e) {
      alert(
        "Your browser doesn't support speech recognition. Try using Chrome or Safari."
      );
    }

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-UK";

    // Save transcript to state
    recognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript = event.results[i][0].transcript;
      }
      setTextFromSpeechRecognition(currentTranscript);
    };

    // Handle errors
    recognition.onerror = function (event) {
      console.error("Speech recognition error: " + event.error);
    };

    if (isRecording) {
      recognition.start();
    }

    // Clean up resources when the component unmounts
    return () => {
      recognition.stop();
    };
  }, [isRecording]);
}
