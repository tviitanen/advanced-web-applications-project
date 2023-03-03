import React, { useState } from "react";
import "./App.css";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const [jwt, setJwt] = useState("");
  const [user, setUser] = useState({});

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
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
  );
}

export default App;
