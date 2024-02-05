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
import transcriberAxios from "../config/axiosConfig";
import MicrophoneTool from "./MicrophoneTool";
import TextArea from "./TextArea";
import Toolbar from "./Toolbar";

export default function Transcriber({ toolbarType, getNotesDataFromApi }) {
  const [textAreaInput, setTextAreaInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [targetNoteID, setTargetNoteID] = useState(null);
  const [targetFolderID, setTargetFolderID] = useState(null);
  const { isLoggedIn, userToken } = useContext(UserContext);
  const { addToMessages } = useContext(UserMessagesContext);
  const navigate = useNavigate();
  const passedData = useLocation();

  // TODO: explain: for save-note-in-folder funcitonality
  useEffect(() => {
    if (passedData.state) {
      if (passedData.state.passedFolderID) {
        const { passedFolderID } = passedData.state;
        setTargetFolderID(passedFolderID);
      }
      if (passedData.state.selectedNote) {
        const { selectedNote } = passedData.state;
        setTextAreaInput(selectedNote.text);
        setTargetNoteID(selectedNote.id);
        setTargetFolderID(selectedNote.folder_id);
      }
    }
  }, [targetFolderID, passedData.state]);

  // useEffect(() => {
  //   if (passedData.state) {
  //     const { passedFolderID, selectedNote } = passedData.state;
  //     setTargetFolderID(passedFolderID);
  //     setTextAreaInput(selectedNote.text);
  //   }
  // }, [targetFolderID, passedData.state]);

  // -- CRUD FUNCTIONS --

  // TODO: refactor into separate functions
  async function createNote(text, targetFolderID) {
    let newNote = {};
    const folderURL = `${foldersApiUrl}${targetFolderID}/`;
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
      console.log("Note saved:", response.data);
      await getNotesDataFromApi();
      localStorage.setItem("message", "Note Saved");
      // addToMessages("Note Saved");
      // setTimeout(() => {
      // addToMessages(""), 2000;
      // })
      // addToMessages("Note Saved");
      // TODO: refactor for duplication in `updateNoteTextField` below and <FolderOptionItem.js/>
      // Redirect to inbox
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

  async function updateNoteTextField() {
    // Assemble the updated note
    const updatedNote = { text: textAreaInput };
    try {
      const response = await axios.patch(
        notesApiUrl + `${targetNoteID}/`,
        updatedNote,
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      );
      console.log("Note updated:", response.data);
      await getNotesDataFromApi();
      // Redirect to inbox
      if (targetFolderID === null) {
        navigate("/inbox");
      } else {
        // Include folder ID in redirect so folder can be opened
        navigate("/folders", { state: { savedToFolderID: targetFolderID } });
      }
    } catch (error) {
      alert("Error updating note:", error.message);
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

  function closeEditPage() {
    navigate("/inbox");
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
            tool1OnClick={updateNoteTextField}
            tool2Label="Cancel"
            tool2Icon={faXmark}
            tool2OnClick={closeEditPage}
          />
        )}
      </footer>
    </>
  );
}
