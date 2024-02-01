import { useState } from "react";

import Transcriber from "../components/Transcriber";

export default function Edit({ getNotesDataFromApi }) {
  const [toolbarType, setToolbarType] = useState("editPage");

  return (
    <>
      <h1>edit</h1>

      <Transcriber
        toolbarType={toolbarType}
        getNotesDataFromApi={getNotesDataFromApi}
      />
    </>
  );
}
