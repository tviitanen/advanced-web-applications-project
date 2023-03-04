import React, { useState } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { HomePage } from "./components/HomePage";
import { AddSnippet } from "./components/AddSnippet";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});

  return (
    <Router>
      <div className="App">
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
