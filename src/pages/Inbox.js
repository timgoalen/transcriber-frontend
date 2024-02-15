import { useState, useContext, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
import NoteDetailModal from "../components/NoteDetailModal.js";
import UserMessages from "../components/UserMessages.js";
import { UserContext } from "../context/UserContext.js";
import usePrevLocationNotification from "../hooks/usePrevLocationNotification.js";
import useNoteDetailModal from "../hooks/useNoteDetailModal.js";
import { notesApiUrl } from "../constants/apiConstants.js";
import { findFolderColour } from "../utils/utils.js";

export default function Inbox({
  // notes,
  // folders,
  // isLoadingNotes,
  createFolder,
  getNotesDataFromApi,
}) {
  const [messageFromPrevLocation, setMessageFromPrevLocation] = useState("");
  const [selectedNote, setSelectedNote] = useState({});
  const { isLoggedIn, userToken } = useContext(UserContext);
  console.log(userToken);

  // const { data: notes, error, isLoading } = useQuery("notesData", fetchNotes);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["notesData"],
    queryFn: getNotes,
  });

  // TODO: move this to separet file, with token linked to it
  async function getNotes() {
    console.log("user token:", userToken);
    const response = await axios.get(notesApiUrl, {
      headers: {
        // Authorization: `Token ${userToken}`,
        Authorization: `Token 4bce18479b2bf2a39a2319d55feaf6f37e7f459a`,
      },
    });
    return response.data;
  }

  const { isModalOpen, openModal, closeModal } = useNoteDetailModal();
  const navigate = useNavigate();
  // TODO: memo this??
  // const inboxNotes = notes.filter((note) => note.folder_id === null);
  const passedData = useLocation();
  const passedMessage = passedData.state?.message;
  usePrevLocationNotification(passedMessage, setMessageFromPrevLocation);

  function handleNoteItemClick(note) {
    openModal();
    setSelectedNote(note);
  }

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <Header pageTitle="inbox">
        <CreateNav />
        <SearchNav />
        <FoldersNav />
      </Header>

      <main>
        <section className="list-page-main">
          <ul>
            {data?.map((note) => (
              <li key={note.id}>{note.text}</li>
            ))}
          </ul>
          {/* {isLoadingNotes ? (
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
          )} */}

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
