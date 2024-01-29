import { faFolder } from "@fortawesome/free-regular-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import NoteListItem from "../components/NoteListItem";

export default function Inbox({ notes, folders }) {
  function handleNoteItemClick() {
    alert("handle note click");
  }

  return (
    <>
      <AltPageHeader
        title="inbox"
        cornerIcon={faFolder}
        cornerIconLinkTo="/folders"
      />

      <main className="list-page-main">
        {notes.map((note) => {
          // Get the colour of the parent folder
          const findFolderColour = () => {
            if (note.folder_id === null) {
              // Return grey if parent folder is inbox (null)
              return "var(--grey)";
            } else {
              const parentFolderURL = note.folder_id;
              const folderIdAsInt = parseInt(
                parentFolderURL.charAt(parentFolderURL.length - 2)
              );
              const parentFolder = folders.find(
                (folder) => folder.id === folderIdAsInt
              );
              console.log("parent folder", parentFolder)
              return parentFolder.colour;
            }
          };

          return (
            <NoteListItem
              key={note.id}
              id={note.id}
              text={note.text}
              folderId={note.folder_id}
              folderColour={findFolderColour()}
              handleNoteItemClick={handleNoteItemClick}
            />
          );
        })}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
