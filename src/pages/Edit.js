import { useState } from "react";

import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";

export default function Edit({ folders, getNotesDataFromApi }) {
  const [toolbarType, setToolbarType] = useState("editPage");

  return (
    <>
      <Header pageTitle="edit"></Header>

      <Transcriber
        folders={folders}
        toolbarType={toolbarType}
        getNotesDataFromApi={getNotesDataFromApi}
      />
    </>
  );
}
