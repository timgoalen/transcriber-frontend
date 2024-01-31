import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import {
  faMicrophone,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import HomePageHeader from "../components/DefaultPageHeader";
import MicrophoneTool from "../components/MicrophoneTool";
import TextArea from "../components/TextArea";
import Toolbar from "../components/Toolbar";
import { CollectionsOutlined } from "@mui/icons-material";

export default function Transcriber({ createNote }) {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [targetFolderID, setTargetFolderID] = useState(null);
  const passedData = useLocation();

  useEffect(() => {
    if (passedData.state) {
      const { passedFolderID } = passedData.state;
      setTargetFolderID(passedFolderID);
    }
  }, [targetFolderID]);

  function handleMicrophoneClick() {
    alert("todo");
  }

  function handleSaveNoteBtnClick() {
    // Inbox has `targetFolderID` of null
    createNote(textAreaInput, targetFolderID);
  }

  function clearTextArea() {
    alert("todo");
  }

  return (
    <>
      <HomePageHeader />

      <main id="main-container">
        <TextArea
          textAreaInput={textAreaInput}
          setTextAreaInput={setTextAreaInput}
        />

        <MicrophoneTool
          icon={faMicrophone}
          handleMicrophoneClick={handleMicrophoneClick}
          isRecording={isRecording}
        />
      </main>

      <footer className="toolbar">
        <Toolbar
          tool1Name="Save"
          tool1Icon={faArrowUpFromBracket}
          tool1OnClick={handleSaveNoteBtnClick}
          tool2Name="Clear"
          tool2Icon={faTrashCan}
          tool2OnClick={clearTextArea}
        />
      </footer>
    </>
  );
}
