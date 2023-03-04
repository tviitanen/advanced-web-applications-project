import React, { useState } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { HomePage } from "./components/HomePage";
import { AddSnippet } from "./components/AddSnippet";
import "materialize-css/dist/css/materialize.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="/HomePage">Home</a>
              </li>
              <li>
                <a href="/Register">Signup</a>
              </li>
            </ul>
          </div>
        </nav>
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
