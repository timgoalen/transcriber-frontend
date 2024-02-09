import { useEffect } from "react";

import {
  capitalise,
  punctuateByVoiceCommand,
  capitaliseAfterThese,
} from "../utils/speechRecognitionUtils.js";

export default function SpeechRecognition({ textAreaInput, setTextAreaInput }) {
  // Initialize speech recognition when component is mounted ('isRecording')
  useEffect(() => {
    let recognition;
    let SpeechRecognition;

    function formatSpeechRecognitionOutput(transcript) {
      const previousNoteContent = textAreaInput;

      // Add punctuation to replace the voice commands('full stop', 'comma' etc.))
      let transcriptWithVoiceCommands = punctuateByVoiceCommand(transcript);

      // If it's a previously empty note, start with a capital letter
      if (!previousNoteContent) {
        const capitalisedTranscript = capitalise(transcriptWithVoiceCommands);
        return capitalisedTranscript;
      }

      // Get the last character
      const lastCharacter = previousNoteContent.charAt(
        previousNoteContent.length - 1
      );
      // If the last character signals a new sentence, add a capital letter
      if (capitaliseAfterThese.includes(lastCharacter)) {
        const newSentence = capitalise(transcriptWithVoiceCommands);
        return " " + newSentence;
      } else {
        return " " + transcriptWithVoiceCommands;
      }
    }

    function setTextFromSpeechRecognition(transcript) {
      const formattedTranscript = formatSpeechRecognitionOutput(transcript);

      setTextAreaInput(
        (prevTextAreaInput) => prevTextAreaInput + formattedTranscript
      );
    }

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

    recognition.start();

    // Clean up resources when the component unmounts
    return () => {
      recognition.stop();
    };
  }, [textAreaInput, setTextAreaInput]);
}
