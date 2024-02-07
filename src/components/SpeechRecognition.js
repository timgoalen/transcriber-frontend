import { useEffect } from "react";

import {
  capitalise,
  capitaliseNewSentence,
  punctuate,
} from "../utils/speechRecognitionUtils.js";

export default function SpeechRecognition({
  isRecording,
  textAreaInput,
  setTextAreaInput,
}) {
  let recognition;
  let SpeechRecognition;

  function setTextFromSpeechRecognition(transcript) {
    // Add punctuation to replace the voice commands
    let punctuatedTranscript = punctuate(transcript);

    // If it's an empty note, start with a capital letter
    if (textAreaInput === "") {
      let capitalisedTranscript = capitalise(punctuatedTranscript);
      setTextAreaInput(
        (prevTextAreaInput) => prevTextAreaInput + capitalisedTranscript
      );
    } else {
      // **THIS FUNCTIONALITY NOT WORKING YET**
    //   **check if previous text exists, then add white space
      // Else if previous text in is the text area, get the last character
      let lastCharacter = textAreaInput.charAt(textAreaInput.length - 1);
      console.log(`last char:${lastCharacter}`);
      const capitaliseAfterThese = [".", "!", "?"];
      // If the last character signals a new sentence, add a capital letter
      if (capitaliseAfterThese.includes(lastCharacter)) {
        let newSentence = capitaliseNewSentence(punctuatedTranscript);
        setTextAreaInput(
          (prevTextAreaInput) => prevTextAreaInput + newSentence
        );
      } else {
        setTextAreaInput(
          (prevTextAreaInput) => prevTextAreaInput + punctuatedTranscript
        );
      }
    }
  }

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
