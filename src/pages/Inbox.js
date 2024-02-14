import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Header from "../components/header/Header";
import CreateNav from "../components/header/CreateNav.js";
import SearchNav from "../components/header/SearchNav.js";
import FoldersNav from "../components/header/FoldersNav.js";
import NoteListItem from "../components/NoteListItem";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import MainTool from "../components/MainTool.js";
import LoadingSpinner from "../components/LoadingSpinner.js";
import UserMessages from "../components/UserMessages.js";
import usePrevLocationNotification from "../hooks/usePrevLocationNotification.js";
import { findFolderColour } from "../utils/utils.js";

export default function Inbox({
  notes,
  folders,
  handleNoteItemClick,
  isLoadingNotes,
}) {
  const [messageFromPrevLocation, setMessageFromPrevLocation] = useState("");
  const navigate = useNavigate();
  // TODO: memo this??
  const inboxNotes = notes.filter((note) => note.folder_id === null);
  const passedData = useLocation();
  const passedMessage = passedData.state?.message;
  usePrevLocationNotification(passedMessage, setMessageFromPrevLocation);

  return (
    <>
      <Header pageTitle="inbox">
        <CreateNav />
        <SearchNav />
        <FoldersNav />
      </Header>

      <main>
        <section className="list-page-main">
          {isLoadingNotes ? (
            <LoadingSpinner />
          ) : (
            <>
              {inboxNotes.map((note) => (
                <NoteListItem
                  key={note.id}
                  id={note.id}
                  text={note.text}
                  folderColour={findFolderColour(folders, note.folder_id)}
                  handleNoteItemClick={handleNoteItemClick}
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

        {messageFromPrevLocation && <UserMessages messages={messageFromPrevLocation} />}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
