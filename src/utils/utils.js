import { foldersApiUrl } from "../constants/apiConstants";

// Isolate the number at the end of the URL
export function parseFolderIdOfNote(folderID) {
  const removedUrl = folderID.replace(foldersApiUrl, "");
  const removedSlashAtEnd = removedUrl.slice(0, -1);
  return parseInt(removedSlashAtEnd);
}

export function findFolderColour(folders, folderID) {
  if (folderID === null) {
    // Return 'grey' if parent folder is inbox
    return "var(--grey)";
  } else {
    // Get the number at the end of the URL
    const folderIdAsInt = parseFolderIdOfNote(folderID);
    const parentFolder = folders.find((folder) => folder.id === folderIdAsInt);
    return parentFolder.colour;
  }
}

export function getNotesInFolder(notes, folderID) {
  const notesNotInInbox = notes.filter((note) => note.folder_id !== null);
  const notesInFolder = notesNotInInbox.filter(
    (note) => parseFolderIdOfNote(note.folder_id) === folderID
  );
  return notesInFolder;
}

export function findNoteByID(notes, noteID) {
  const selectedNote = notes.find((note) => note.id === noteID);
  return selectedNote;
}

export function findFolderTitleByID(folders, folderID) {
  const targetFolder = folders.find((folder) => folder.id === folderID);
  const folderTitle = targetFolder.title;
  return folderTitle;
}

export function generateRandomColour() {
  const letters = "0123456789ABCDEF";
  let colour = "#";

  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }

  return colour;
}
