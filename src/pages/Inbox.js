import { useState } from "react";

import { faFolder } from "@fortawesome/free-regular-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import NoteListItem from "../components/NoteListItem";
import { findFolderColour } from "../utils/utils.js";

export default function Inbox({ notes, folders, handleNoteItemClick }) {
  const inboxNotes = notes.filter(note => note.folder_id === null);

  return (
    <>
      <AltPageHeader
        title="inbox"
        cornerIcon={faFolder}
        cornerIconLinkTo="/folders"
      />

      <main className="list-page-main">
        {inboxNotes.map((note) => {
          return (
            <NoteListItem
              key={note.id}
              id={note.id}
              text={note.text}
              folderId={note.folder_id}
              folderColour={findFolderColour(folders, note.folder_id)}
              handleNoteItemClick={handleNoteItemClick}
            />
          );
        })}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
