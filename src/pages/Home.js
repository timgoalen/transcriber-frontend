import { useState } from "react";

import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";
import Account from "../components/header/Account";
import Inbox from "../components/header/Inbox";

export default function Home({ getNotesDataFromApi }) {
  const [toolbarType, setToolbarType] = useState("homePage");

  return (
    <>
      <Header pageTitle="transcriber">
        <Account />
        <Inbox />
      </Header>

      <Transcriber
        toolbarType={toolbarType}
        getNotesDataFromApi={getNotesDataFromApi}
      />
    </>
  );
}
