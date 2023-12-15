import { useEffect } from "react";

// *TODO: refactor this code*
export default function SpeechRecognition({
  isRecording,
  handleUserInputText,
  setTextFromSpeechRecognition,
}) {
  let recognition;
  let SpeechRecognition;

  useEffect(() => {
    try {
      SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      console.log("speech recognition initialized");
    } catch (e) {
      alert(
        "Your browser doesn't support speech recognition. Try using Chrome or Safari."
      );
    }

    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-UK";

    // -- RECOGNITION FUNCTIONALITY --

    recognition.onresult = (event) => {
      let currentTranscript = "";
      // const capitaliseAfterThese = [".", "!", "?"];

      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript = event.results[i][0].transcript;
      }

      setTextFromSpeechRecognition(currentTranscript);

      // // TODO: explain this code in comments..
      // if (currentTranscript) {
      //   // const previousTranscript = textInput;
      //   const previousTranscript = textInput;
      //   const punctuatedTranscript = punctuate(currentTranscript);

      //   if (previousTranscript === "") {
      //     // setTextInput(capitalise(punctuatedTranscript));
      //     console.log(capitalise(punctuatedTranscript));
      //   } else {
      //     let lastCharacter = previousTranscript.charAt(
      //       previousTranscript.length - 2
      //     );
      //     if (capitaliseAfterThese.includes(lastCharacter)) {
      //       // setTextInput(
      //       //   previousTranscript + capitaliseNewSentence(punctuatedTranscript)
      //       // );
      //     } else {
      //       // setTextInput(previousTranscript + punctuatedTranscript);
      //       console.log(previousTranscript + punctuatedTranscript);
      //     }
      //   }
      // }
    };

    // Handle errors
    recognition.onerror = function (event) {
      console.error("Speech recognition error: " + event.error);
    };

    if (isRecording) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isRecording]);
}
