import { faFolder } from "@fortawesome/free-regular-svg-icons";

import AltPageHeader from "../components/AltPageHeader";

export default function Inbox({ notes }) {
  console.log(notes);
  return (
    <>
    <AltPageHeader
      title="inbox"
      cornerIcon={faFolder}
      cornerIconLinkTo="/folders"
    />
    {notes.map(note => (
      <div>{note.text}</div>
    ))}
    
    </>
  );
}
