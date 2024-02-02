export function parseFolderURL(url) {
  const idNumberAtEndOfURL = parseInt(url.charAt(url.length - 2));
  return idNumberAtEndOfURL;
}

export function findFolderColour(folders, folderID) {
  if (folderID === null) {
    // Return 'grey' if parent folder is inbox
    return "var(--grey)";
  } else {
    // Get the number at the end of the URL
    const folderIdAsInt = parseInt(folderID.charAt(folderID.length - 2));
    const parentFolder = folders.find((folder) => folder.id === folderIdAsInt);
    return parentFolder.colour;
  }
}

export function getNotesInFolder(notes, folderID) {
  const notesNotInInbox = notes.filter((note) => note.folder_id !== null);
  const notesInFolder = notesNotInInbox.filter(
    (note) =>
      parseInt(note.folder_id.charAt(note.folder_id.length - 2)) === folderID
  );
  return notesInFolder;
}

export function findNoteByID(notes, noteID) {
  const selectedNote = notes.find((note) => note.id === noteID);
  return selectedNote;
}

// CHANGE TO A MORE CURATION RANGE OF COLOURS
export function generateRandomColour() {
  const letters = "0123456789ABCDEF";
  let colour = "#";

  for (let i = 0; i < 6; i++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }

  return colour;
}
