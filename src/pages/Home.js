import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";
import AccountNav from "../components/header/AccountNav";
import InboxNav from "../components/header/InboxNav";

export default function Home({
  folders,
  getNotesDataFromApi,
  noteStoreForLoggedOutUsers,
  setNoteStoreForLoggedOutUsers,
}) {
  return (
    <>
      <Header pageTitle="transcriber">
        <AccountNav />
        <InboxNav />
      </Header>

      <Transcriber
        folders={folders}
        toolbarType="homePage"
        getNotesDataFromApi={getNotesDataFromApi}
        noteStoreForLoggedOutUsers={noteStoreForLoggedOutUsers}
        setNoteStoreForLoggedOutUsers={setNoteStoreForLoggedOutUsers}
      />
    </>
  );
}
