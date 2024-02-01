import { useState } from "react";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFolder } from "@fortawesome/free-regular-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import NoteListItem from "../components/NoteListItem";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import MainTool from "../components/MainTool.js";
import { findFolderColour } from "../utils/utils.js";

export default function Inbox({ notes, folders, handleNoteItemClick }) {
  const inboxNotes = notes.filter((note) => note.folder_id === null);

  return (
    <>
      <AltPageHeader
        title="inbox"
        cornerIcon={faFolder}
        cornerIconLinkTo="/folders"
      />

      <main className="list-page-main">
        {inboxNotes.map((note) => (
          <NoteListItem
            key={note.id}
            id={note.id}
            text={note.text}
            folderId={note.folder_id}
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

        <MainTool
          className="main-tool-orange"
          ariaLabel="New note"
          onClick={() => alert("todo")}
          icon={faPlus}
        />
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
