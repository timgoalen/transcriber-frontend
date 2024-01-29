import { faListUl } from "@fortawesome/free-solid-svg-icons";

import AltPageHeader from "../components/AltPageHeader";
import FolderListItem from "../components/FolderListItem";

export default function Folders({ folders }) {
  return (
    <>
      <AltPageHeader
        title="folders"
        cornerIcon={faListUl}
        cornerIconLinkTo="/inbox"
      />

      <main className="list-page-main">
        {folders.map((folder) => (
          <FolderListItem
            key={folder.id}
            title={folder.title}
            colour={folder.colour}
          />
        ))}
      </main>

      <footer className="toolbar"></footer>
    </>
  );
}
