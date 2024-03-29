import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";

/**
 * Component for rendering the Home Page.
 */
export default function Home({
  folders,
  getNotesDataFromApi,
  noteStoreForLoggedOutUsers,
  setNoteStoreForLoggedOutUsers,
}) {
  return (
    <>
      <Header pageTitle="transcriber" />

      <Transcriber
        initialTextAreaValue=""
        initialTargetNoteID={null}
        initialTargetFolderID={null}
        folders={folders}
        toolbarType="homePage"
        getNotesDataFromApi={getNotesDataFromApi}
        noteStoreForLoggedOutUsers={noteStoreForLoggedOutUsers}
        setNoteStoreForLoggedOutUsers={setNoteStoreForLoggedOutUsers}
      />
    </>
  );
}
