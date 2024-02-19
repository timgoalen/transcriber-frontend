import { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import Transcriber from "../components/Transcriber";
import Header from "../components/header/Header";

export default function Edit({ folders, getNotesDataFromApi }) {
  const passedData = useLocation();
  const navigate = useNavigate();

  /* 
  Redirect to the home page if user navigates directly to the "/edit" URL,
  without being directed by an "edit note" click.
  */
  useEffect(() => {
    if (!passedData?.state?.selectedNote) {
      navigate("/");
    }
  }, [passedData, passedData.state, navigate]);

  return (
    <>
      <Header pageTitle="edit" />

      <Transcriber
        initialTextAreaValue={passedData?.state?.selectedNote?.text}
        initialTargetNoteID={passedData?.state?.selectedNote?.id}
        initialTargetFolderID={passedData?.state?.selectedNote?.folder_id}
        folders={folders}
        toolbarType="editPage"
        getNotesDataFromApi={getNotesDataFromApi}
      />
    </>
  );
}
