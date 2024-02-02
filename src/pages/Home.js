import { useState } from "react";

import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";
import AccountNav from "../components/header/AccountNav";
import InboxNav from "../components/header/InboxNav";

export default function Home({ getNotesDataFromApi }) {
  const [toolbarType, setToolbarType] = useState("homePage");

  return (
    <>
      <Header pageTitle="transcriber">
        <AccountNav />
        <InboxNav />
      </Header>

      <Transcriber
        toolbarType={toolbarType}
        getNotesDataFromApi={getNotesDataFromApi}
      />
    </>
  );
}
