import { faListUl } from "@fortawesome/free-solid-svg-icons";

import AltPageHeader from "../components/AltPageHeader";

export default function Folders() {
  return (
    <AltPageHeader
      title="folders"
      cornerIcon={faListUl}
      cornerIconLinkTo="/inbox"
    />
  );
}
