import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const [userData, setUserData] = useState({});

  let navigate = useNavigate();
  const jwt = props.jwt;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jwt) {
      alert("You are already logged in");
      return;
    }
    console.log(userData.email);

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          props.setJwt(data.token);
          props.setUser(
            JSON.parse(
              Buffer.from(data.token.split(".")[1], "base64").toString()
            )
          );
          let path = `/register`;
          navigate(path);
        }
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form
        className="login-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="email">email</label>
        <div className="input-field">
          <input
            type="email"
            required
            placeholder="youremail@mail.com"
            id="email"
            name="email"
          />
        </div>
        <label htmlFor="password">password</label>
        <div className="input-field">
          <input
            type="password"
            required
            placeholder="********"
            id="password"
            name="password"
          />
        </div>
        <button className="button" type="submit">
          Log In
        </button>
      </form>
      <Link to="/register"> Don't have an account? Register here. </Link>
    </div>
  );
};
