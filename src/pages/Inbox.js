import { useContext, useEffect } from "react";

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
import { UserMessagesContext } from "../context/UserMessagesContext";
import { findFolderColour } from "../utils/utils.js";

export default function Inbox({
  notes,
  folders,
  handleNoteItemClick,
  isLoadingNotes,
}) {
  const navigate = useNavigate();
  // TODO: memo this??
  const inboxNotes = notes.filter((note) => note.folder_id === null);
  const { addToMessages } = useContext(UserMessagesContext);
  const passedData = useLocation();
  const passedMessage = passedData.state?.message;

  // Show confimation messages if recieved from Transcriber
  useEffect(() => {
    if (passedMessage) {
      addToMessages(passedMessage);
    }
    // eslint-disable-next-line
  }, []);

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
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
