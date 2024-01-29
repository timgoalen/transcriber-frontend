import { faFolder } from "@fortawesome/free-regular-svg-icons";

import AltPageHeader from "../components/AltPageHeader";

export default function Inbox() {
  return (
    <AltPageHeader
      title="inbox"
      cornerIcon={faFolder}
      cornerIconLinkTo="/folders"
    />
  );
}
