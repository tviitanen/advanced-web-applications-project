import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { Register } from "./components/Register";
import { HomePage } from "./components/HomePage";
import { AddSnippet } from "./components/AddSnippet";
import SnippetList from "./components/SnippetList";
import Snippet from "./components/Snippet";
import SideNav from "./components/SideNav";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // use state to store jwt and user data
  const [jwt, setJwt] = useState(false);
  const [user, setUser] = useState({});
  const { t } = useTranslation();
  // paths for the side nav
  let home = t("home");
  let snippets = t("snippets");
  let signUp = t("signup");
  let addSnippet = t("addSnippet");

  const menuPaths = [
    {
      name: home,
      path: "/",
    },
    {
      name: snippets,
      path: "/snippets",
    },
    {
      name: signUp,
      path: "/register",
    },
    {
      name: addSnippet,
      path: "/add-snippet",
    },
  ];

  return (
    <Router>
      <div className="App">
        <SideNav className="navbar" paths={menuPaths} title="Menu" />
        <ul id="slide-out" className="sidenav"></ul>
        <Routes>
          <Route path="/" element={<HomePage user={user} jwt={jwt} />} />
          <Route
            path="/login"
            element={
              <Login setJwt={setJwt} setUser={setUser} jwt={jwt} user={user} />
            }
          />
          <Route
            path="/register"
            element={<Register setUser={setUser} jwt={jwt} />}
          />
          <Route
            path="/add-snippet"
            element={<AddSnippet user={user} jwt={jwt} />}
          />
          <Route path="/snippets" element={<SnippetList jwt={jwt} />} />
          <Route
            path="/snippets/:id"
            element={<Snippet user={user} jwt={jwt} />}
          />
          <Route path="*" element={<h1>{t("404")}</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
