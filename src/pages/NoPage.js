import { Link } from "react-router-dom";

import Header from "../components/header/Header.js";
import CreateNav from "../components/header/CreateNav.js";

export default function NoPage() {
  return (
    <>
      <Header pageTitle="transcriber">
        <CreateNav />
      </Header>

      <div>Whoops, that page doesn't exist: <Link to="/">Home</Link></div>
    </>
  );
}
