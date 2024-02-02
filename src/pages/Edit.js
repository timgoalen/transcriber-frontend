import { useState } from "react";

import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";
import Account from "../components/header/AccountNav";
import Inbox from "../components/header/InboxNav";

export default function Edit({ getNotesDataFromApi }) {
  const [toolbarType, setToolbarType] = useState("editPage");

  return (
    <>
      <Header pageTitle="edit"></Header>

      <Transcriber
        toolbarType={toolbarType}
        getNotesDataFromApi={getNotesDataFromApi}
      />
    </>
  );
}
