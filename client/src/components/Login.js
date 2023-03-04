import React, { useState } from "react";
import Button from "react-bootstrap/Button";

export const Login = (props) => {
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData.email);

    fetch("/users/login", {
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
        }
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form
        className="login-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="email">email</label>
        <input
          type="email"
          placeholder="youremail@mail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="button" type="submit">
          Log In
        </button>
      </form>
      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
