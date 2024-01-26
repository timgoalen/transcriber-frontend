import { Routes, Route, Link } from "react-router-dom";

import Transcriber from "./pages/Transcriber";
import Inbox from "./pages/Inbox";
import Folders from "./pages/Folders";
import Update from "./pages/Update";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";

export default function App() {
  return (
    <>
      <Link to="/">home</Link>
      <Link to="/inbox">inbox</Link>
      <Link to="/folders">folders</Link>
      <Link to="/update">update</Link>
      <Link to="/signup">sign up</Link>
      <Link to="/login">log in</Link>
      <Routes>
        <Route path="/" element={<Transcriber />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/update" element={<Update />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/nopage" element={<NoPage />} />
        <Route path="/layout" element={<Layout />} />
      </Routes>
    </>
  );
}
