import { useEffect, useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { UserContext } from "../context/UserContext";
import transcriberAxios from "../config/axiosConfig";
import MicrophoneTool from "./MicrophoneTool";
import TextArea from "./TextArea";
import Toolbar from "./Toolbar";

export default function Transcriber({ toolbarType, getNotesDataFromApi }) {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [targetFolderID, setTargetFolderID] = useState(null);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const navigate = useNavigate();
  const passedData = useLocation();

  // TODO: change this to axios global...
  const notesApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/notes/";
  const foldersApiUrl =
    "https://transcriber-backend-api-22aee3c5fb11.herokuapp.com/folders/";

  useEffect(() => {
    if (passedData.state) {
      const { passedFolderID } = passedData.state;
      setTargetFolderID(passedFolderID);
    }
  }, [targetFolderID]);

  // -- CRUD FUNCTIONS --

  // TODO: refactor into separate functions
  async function createNote(text, targetFolderID) {
    let newNote = {};
    const folderURL = `${foldersApiUrl}${targetFolderID}/`;
    targetFolderID === null
      ? (newNote = { text: text, folder_id: null })
      : (newNote = { text: text, folder_id: folderURL });
    try {
      const response = await axios.post(notesApiUrl, newNote, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Note saved:", response.data);
      await getNotesDataFromApi();
      // Redirect to inbox of folders
      if (targetFolderID === null) {
        navigate("/inbox");
      } else {
        // Include folder ID in redirect so folder can be opened
        navigate("/folders", { state: { savedToFolderID: targetFolderID } });
      }
    } catch (error) {
      alert(`Error saving note: ${error.message}`);
    }
  }

  // -- CLICK HANDLERS --

  function handleSaveNoteBtnClick() {
    // Inbox has `targetFolderID` of null
    createNote(textAreaInput, targetFolderID);
  }

  function handleMicrophoneClick() {
    alert("todo");
  }

  function clearTextArea() {
    setTextAreaInput("");
  }

  return (
    <>
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
        {toolbarType === "homePage" && (
          <Toolbar
            tool1Label="Save"
            tool1Icon={faArrowUpFromBracket}
            tool1OnClick={handleSaveNoteBtnClick}
            tool2Label="Clear"
            tool2Icon={faTrashCan}
            tool2OnClick={clearTextArea}
          />
        )}
        {toolbarType === "editPage" && (
          <Toolbar
            tool1Label="Update"
            tool1Icon={faArrowUpFromBracket}
            tool1OnClick={() => alert("todo")}
            tool2Label="Cancel"
            tool2Icon={faXmark}
            tool2OnClick={clearTextArea}
          />
        )}
      </footer>
    </>
  );
}
