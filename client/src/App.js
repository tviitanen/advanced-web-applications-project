import React, { useState } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Register />} />
        </Routes>
        <h2>{jwt ? `Welcome ${user.name}!` : ""}</h2>
        {currentForm === "login" ? (
          <Login
            onFormSwitch={toggleForm}
            setJwt={setJwt}
            setUser={setUser}
            jwt={jwt}
          />
        ) : (
          <Register
            onFormSwitch={toggleForm}
            setJwt={setJwt}
            setUser={setUser}
            jwt={jwt}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
