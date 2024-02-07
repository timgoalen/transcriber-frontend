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
import { UserMessagesContext } from "../context/UserMessagesContext";
import { notesApiUrl, foldersApiUrl } from "../constants/apiConstants";
import { parseFolderIdOfNote, findFolderTitleByID } from "../utils/utils.js";
import MicrophoneTool from "./MicrophoneTool";
import SpeechRecognition from "./SpeechRecognition.js";
import OpenAiApi from "./OpenAiApi.js";
import TextArea from "./TextArea";
import Toolbar from "./Toolbar";
import LogInSignUpPrompt from "./LogInSignUpPrompt.js";

export default function Transcriber({
  folders,
  toolbarType,
  getNotesDataFromApi,
}) {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [targetNoteID, setTargetNoteID] = useState(null);
  const [targetFolderID, setTargetFolderID] = useState(null);
  const [showLogInSignUpPrompt, setShowLogInSignUpPrompt] = useState(false);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const navigate = useNavigate();
  const passedData = useLocation();

  // Handle data passed form other routes
  useEffect(() => {
    // Set target folder ID if note is to be created in folder
    if (passedData?.state?.passedFolderID) {
      const { passedFolderID } = passedData.state;
      setTargetFolderID(passedFolderID);
    }
    // Populate textarea and save a distination folder
    if (passedData?.state?.selectedNote) {
      const { selectedNote } = passedData.state;
      setTextAreaInput(selectedNote.text);
      setTargetNoteID(selectedNote.id);
      if (selectedNote.folder_id === null) {
        setTargetFolderID(null);
      } else {
        setTargetFolderID(parseFolderIdOfNote(selectedNote.folder_id));
      }
    }
    // Set user message on log in
    if (passedData?.state?.message) {
      const { message } = passedData.state;
      addToMessages(message);
    }
  }, []);

  // -- CRUD FUNCTIONS --

  // TODO: refactor into separate functions
  async function createNote(text, targetFolderID) {
    const folderURL = `${foldersApiUrl}${targetFolderID}/`;

    let newNote = {};
    targetFolderID === null
      ? // Save to inbox
        (newNote = { text: text, folder_id: null })
      : // Save to target folder
        (newNote = { text: text, folder_id: folderURL });

    try {
      const response = await axios.post(notesApiUrl, newNote, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log(`Note saved: ${response.data}`);
      await getNotesDataFromApi();
      if (targetFolderID === null) {
        // Redirect to inbox
        navigate("/inbox", { state: { message: "saved to 'inbox'" } });
      } else {
        // Include folder ID in redirect so folder can be opened
        const folderTitle = findFolderTitleByID(folders, targetFolderID);
        navigate("/folders", {
          state: {
            savedToFolderID: targetFolderID,
            message: `saved to '${folderTitle}'`,
          },
        });
      }
    } catch (error) {
      addToMessages("error saving note");
      alert(`Error saving note: ${error.message}`);
    }
  }

  async function updateNoteTextField() {
    // Assemble the updated note
    const updatedNote = { text: textAreaInput };
    try {
      const response = await axios.patch(
        `${notesApiUrl}${targetNoteID}/`,
        updatedNote,
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.log(`Note updated: ${response.data}`);
      await getNotesDataFromApi();
      if (targetFolderID === null) {
        // Redirect to inbox
        navigate("/inbox", { state: { message: "note updated" } });
      } else {
        // Include folder ID in redirect so folder can be opened
        navigate("/folders", {
          state: { savedToFolderID: targetFolderID, message: "note updated" },
        });
      }
    } catch (error) {
      alert(`Error updating note: ${error.message}`);
    }
  }

  // -- CLICK HANDLERS --

  function handleSaveNoteBtnClick() {
    if (!isLoggedIn) {
      setShowLogInSignUpPrompt(true);
      return;
    }
    if (textAreaInput.trim() > "") {
      createNote(textAreaInput, targetFolderID);
    } else {
      addToMessages("whoops, can't save an empty note");
    }
  }

  function handleUpdateNoteBtnClick() {
    if (textAreaInput.trim() > "") {
      updateNoteTextField();
    } else {
      addToMessages("whoops, can't update with an empty note");
    }
  }

  function handleMicrophoneClick() {
    setIsRecording(!isRecording);
  }

  function clearTextArea() {
    setTextAreaInput("");
  }

  function closeEditPage() {
    navigate("/inbox");
  }

  return (
    <>
      <main id="main-container">
        <TextArea
          textAreaInput={textAreaInput}
          setTextAreaInput={setTextAreaInput}
          isRecording={isRecording}
        />

        <SpeechRecognition
          isRecording={isRecording}
          textAreaInput={textAreaInput}
          setTextAreaInput={setTextAreaInput}
        />

        <OpenAiApi
          textAreaInput={textAreaInput}
          setTextAreaInput={setTextAreaInput}
        />

        <MicrophoneTool
          icon={faMicrophone}
          handleMicrophoneClick={handleMicrophoneClick}
          isRecording={isRecording}
        />

        {showLogInSignUpPrompt && (
          <LogInSignUpPrompt
            userAttempedAction="save a note"
            setShowLogInSignUpPrompt={setShowLogInSignUpPrompt}
          />
        )}
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
            tool1OnClick={handleUpdateNoteBtnClick}
            tool2Label="Cancel"
            tool2Icon={faXmark}
            tool2OnClick={closeEditPage}
          />
        )}
      </footer>
    </>
  );
}
