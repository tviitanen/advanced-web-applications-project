import React, { useState } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { HomePage } from "./components/HomePage";
import { AddSnippet } from "./components/AddSnippet";
import SideNav from "./components/SideNav";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});
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
      name: "Stuff",
      path: "/stuff",
    },
  ];

  return (
    <Router>
      <div className="App">
        <SideNav className="navbar" paths={menuPaths} title="Menu" />
        <ul id="slide-out" className="sidenav"></ul>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-snippet" element={<AddSnippet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
