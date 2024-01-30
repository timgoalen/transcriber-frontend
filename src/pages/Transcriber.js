import { useState } from "react";

import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import HomePageHeader from "../components/DefaultPageHeader";
import MicrophoneTool from "../components/MicrophoneTool";

export default function Transcriber() {
  const [isRecording, setIsRecording] = useState(false);

  function handleMicrophoneClick() {
    alert("todo");
  }

  return (
    <>
      <HomePageHeader />

      <main id="main-container">
        <MicrophoneTool
          icon={faMicrophone}
          handleMicrophoneClick={handleMicrophoneClick}
          isRecording={isRecording}
        />
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
