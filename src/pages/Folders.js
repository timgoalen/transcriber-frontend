import { useState, Fragment, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import FolderListItem from "../components/FolderListItem";
import NotesInFolderDropdown from "../components/NotesInFolderDropdown";
import EmptyPlaceholderGraphics from "../components/EmptyPlaceholderGraphics.js";
import NewFolderForm from "../components/NewFolderForm.js";
import MainTool from "../components/MainTool.js";
import { getNotesInFolder } from "../utils/utils.js";

export default function Folders({
  notes,
  folders,
  handleNoteItemClick,
  createFolder,
  getAllDataFromApi,
}) {
  const [showNotesInFolder, setShowNotesInFolder] = useState(0);
  const [showNewFolderForm, setShowNewFolderForm] = useState(false);
  const [openToolList, setOpenToolList] = useState(0);
  const [editFolderTitle, setEditFolderTitle] = useState(0);

  // TODO: explain why this is needed
  const passedData = useLocation();
  useEffect(() => {
    if (passedData.state) {
      const { savedToFolderID } = passedData.state;
      setShowNotesInFolder(savedToFolderID);
    }
  }, []);

  // -- CLICK HANDLERS --

  function handleFolderClick(id) {
    // Show/hide notes list
    showNotesInFolder === id
      ? setShowNotesInFolder(0)
      : setShowNotesInFolder(id);
  }

  function handleNewFolderFormSubmit(title) {
    setShowNewFolderForm(false);
    createFolder(title);
  }

  function handleFolderOptionsClick(id) {
    openToolList === id ? setOpenToolList(0) : setOpenToolList(id);
  }

  function handleFolderEditClick(id) {
    setEditFolderTitle(id);
  }

  // -- RENDER ELEMENTS --

  return (
    <>
      <AltPageHeader
        title="folders"
        cornerIcon={faListUl}
        cornerIconLinkTo="/inbox"
      />

      <main className="list-page-main">
        {folders.map((folder) => (
          <Fragment key={folder.id}>
            {editFolderTitle === folder.id ? (
              <NewFolderForm
                setShowNewFolderForm={setShowNewFolderForm}
                handleNewFolderFormSubmit={handleNewFolderFormSubmit}
              />
            ) : (
              <FolderListItem
                id={folder.id}
                title={folder.title}
                colour={folder.colour}
                handleFolderClick={handleFolderClick}
                handleFolderOptionsClick={handleFolderOptionsClick}
                openToolList={openToolList}
                handleFolderEditClick={handleFolderEditClick}
                getAllDataFromApi={getAllDataFromApi}
              />
            )}

            {showNotesInFolder === folder.id && (
              <NotesInFolderDropdown
                folders={folders}
                notesInFolder={getNotesInFolder(notes, folder.id)}
                handleNoteItemClick={handleNoteItemClick}
                parentFolderID={folder.id}
              />
            )}
          </Fragment>
        ))}

        {showNewFolderForm ? (
          <NewFolderForm
            setShowNewFolderForm={setShowNewFolderForm}
            handleNewFolderFormSubmit={handleNewFolderFormSubmit}
          />
        ) : (
          <MainTool
            className="main-tool-blue"
            ariaLabel="New folder"
            onClick={() => setShowNewFolderForm(true)}
            icon={faPlus}
          />
        )}

        {folders.length === 0 && (
          <EmptyPlaceholderGraphics
            primaryColour="#268cf2"
            secondaryColour="#f28c26"
          />
        )}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
