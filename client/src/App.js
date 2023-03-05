import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import { Register } from "./components/Register";
import { HomePage } from "./components/HomePage";
import { AddSnippet } from "./components/AddSnippet";
import SnippetData from "./components/SnippetData";
import SideNav from "./components/SideNav";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // use state to store jwt and user data
  const [jwt, setJwt] = useState(false);
  const [user, setUser] = useState({});

  // paths for the side nav
  const menuPaths = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Sign up",
      path: "/register",
    },
    {
      name: "Add snippet",
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
          <Route path="/snippets" element={<SnippetData />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
