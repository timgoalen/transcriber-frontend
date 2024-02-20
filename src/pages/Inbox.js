import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/header/Header";
import NoteListItem from "../components/NoteListItem";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import MainTool from "../components/MainTool.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import NoteDetailModal from "../components/NoteDetailModal.js";
import UserMessages from "../components/UserMessages.js";
import usePrevLocationNotification from "../hooks/usePrevLocationNotification.js";
import useNoteDetailModal from "../hooks/useNoteDetailModal.js";
import { findFolderColour } from "../utils/utils.js";

/**
 * Component for displaying the list of notes in the 'Inbox'.
 */
export default function Inbox({
  notes,
  folders,
  isLoadingNotes,
  createFolder,
  getNotesDataFromApi,
}) {
  const [messageFromPrevLocation, setMessageFromPrevLocation] = useState("");
  const [selectedNote, setSelectedNote] = useState({});
  const { isModalOpen, openModal, closeModal } = useNoteDetailModal();
  const navigate = useNavigate();
  const inboxNotes = notes.filter((note) => note.folder_id === null);
  const passedData = useLocation();
  const passedMessage = passedData.state?.message;
  usePrevLocationNotification(passedMessage, setMessageFromPrevLocation);

  function handleNoteItemClick(note) {
    openModal();
    setSelectedNote(note);
  }

  return (
    <>
      <Header pageTitle="inbox" />

      <main>
        <section className="list-page-main">
          {isLoadingNotes ? (
            <LoadingSpinner />
          ) : (
            <>
              {inboxNotes.map((note) => (
                <NoteListItem
                  key={note.id}
                  onClick={() => {
                    handleNoteItemClick(note);
                  }}
                  text={note.text}
                  folderColour={findFolderColour(folders, note.folder_id)}
                />
              ))}

              {inboxNotes.length === 0 && (
                <EmptyPlaceholderGraphics
                  primaryColour="#f28c26"
                  secondaryColour="#268cf2"
                />
              )}
            </>
          )}

          <MainTool
            className="main-tool-orange"
            ariaLabel="New note"
            onClick={() => navigate("/")}
            icon={faPlus}
          />
        </section>

        {isModalOpen && (
          <NoteDetailModal
            selectedNote={selectedNote}
            folders={folders}
            closeModal={closeModal}
            createFolder={createFolder}
            getNotesDataFromApi={getNotesDataFromApi}
          />
        )}

        {messageFromPrevLocation && (
          <UserMessages messages={messageFromPrevLocation} />
        )}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
