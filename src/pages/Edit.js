import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";

export default function Edit({ folders, getNotesDataFromApi }) {
  return (
    <>
      <Header pageTitle="edit"></Header>

      <Transcriber
        folders={folders}
        toolbarType="editPage"
        getNotesDataFromApi={getNotesDataFromApi}
      />
    </>
  );
}
