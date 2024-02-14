import { useEffect, useState, useContext } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  faMicrophone,
  faArrowUpFromBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import MicrophoneTool from "./MicrophoneTool";
import SpeechRecognition from "./SpeechRecognition.js";
import OpenAiApi from "./OpenAiApi.js";
import TextArea from "./TextArea";
import Toolbar from "./Toolbar";
import LogInSignUpPrompt from "./LogInSignUpPrompt.js";
import { UserContext } from "../context/UserContext";
import { UserMessagesContext } from "../context/UserMessagesContext";
import { notesApiUrl, foldersApiUrl } from "../constants/apiConstants";
import {
  findFolderTitleByID,
} from "../utils/utils.js";

export default function Transcriber({
  initialTextAreaValue,
  initialTargetNoteID,
  initialTargetFolderID,
  folders,
  toolbarType,
  getNotesDataFromApi,
  noteStoreForLoggedOutUsers,
  setNoteStoreForLoggedOutUsers,
}) {
  const [textAreaInput, setTextAreaInput] = useState(initialTextAreaValue);
  const [targetFolderID, setTargetFolderID] = useState(initialTargetFolderID);
  const [isRecording, setIsRecording] = useState(false);
  const [showLogInSignUpPrompt, setShowLogInSignUpPrompt] = useState(false);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const navigate = useNavigate();
  const passedData = useLocation();
  const targetNoteID = initialTargetNoteID;

  // -- NAVIGATION HANDLERS --

  // Handle data passed form other routes
  useEffect(() => {
    // Set target folder ID if note is to be created in folder
    if (passedData?.state?.passedFolderID) {
      const { passedFolderID } = passedData.state;
      setTargetFolderID(passedFolderID);
    }

    // Set user message on log in
    if (passedData?.state?.message) {
      const { message } = passedData.state;
      addToMessages(message);
    }

    // If logged out users were creating a note before logging in, retrieve that note
    if (noteStoreForLoggedOutUsers) {
      setTextAreaInput(noteStoreForLoggedOutUsers);
      setNoteStoreForLoggedOutUsers("");
    }
    // eslint-disable-next-line
  }, []);

  function handleNavigationOnCrudSuccess(targetFolderID, message) {
    if (targetFolderID === null) {
      // Redirect to inbox
      navigate("/inbox", { state: { message: message } });
    } else {
      // Include folder ID in redirect so folder can be opened
      navigate("/folders", {
        state: {
          savedToFolderID: targetFolderID,
          message: message,
        },
      });
    }
  }

  // -- CRUD FUNCTIONS --

  async function createNote(text, targetFolderID) {
    const folderURL = `${foldersApiUrl}${targetFolderID}/`;

    // Assemble the note object
    let newNote = {};
    targetFolderID === null
      ? // Save to inbox
        (newNote = { text: text, folder_id: null })
      : // Save to target folder
        (newNote = { text: text, folder_id: folderURL });

    // Make a POST request to the API
    try {
      const response = await axios.post(notesApiUrl, newNote, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      console.log("Note created: ", response.data);
      await getNotesDataFromApi();
      // Redirect user and provide confirmation message
      const message =
        targetFolderID === null
          ? "saved to 'inbox'"
          : `saved to '${findFolderTitleByID(folders, targetFolderID)}'`;
      handleNavigationOnCrudSuccess(targetFolderID, message);
    } catch (error) {
      addToMessages("error saving note");
      alert(`Error saving note: ${error.message}`);
    }
  }

  async function updateNoteTextField() {
    // Assemble the updated note
    const updatedNote = { text: textAreaInput };

    // Make a PATCH request to the API
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
      console.log("Note updated: ", response.data);
      await getNotesDataFromApi();
      // Redirect user and provide confirmation message
      const message = "note updated";
      handleNavigationOnCrudSuccess(targetFolderID, message);
    } catch (error) {
      console.error("Error updating note:", error);
      alert(`Error updating note: ${error.message}`);
    }
  }

  // -- CLICK HANDLERS --

  function handleSaveNoteBtnClick() {
    if (!isLoggedIn) {
      setNoteStoreForLoggedOutUsers(textAreaInput);
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

        {isRecording ? (
          <SpeechRecognition
            textAreaInput={textAreaInput}
            setTextAreaInput={setTextAreaInput}
          />
        ) : (
          <OpenAiApi
            textAreaInput={textAreaInput}
            setTextAreaInput={setTextAreaInput}
          />
        )}

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
