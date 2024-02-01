import { Link } from "react-router-dom";

import Header from "../components/header/Header.js";
import Create from "../components/header/Create";

export default function NoPage() {
  return (
    <>
      <Header pageTitle="transcriber">
        <Create />
      </Header>

      <div>Whoops, that page doesn't exist: <Link to="/">Home</Link></div>
    </>
  );
}
