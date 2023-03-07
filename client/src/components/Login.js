import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { useTranslation } from "react-i18next";

// LOGIN PAGE
export default function Login({ setJwt, jwt, user, setUser }) {
  let navigate = useNavigate();
  const { t } = useTranslation();

  // login data to be sent to server on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if user is already logged in, redirect to home page
    if (jwt !== false) {
      console.log(jwt);
      alert("You are already logged in");
      return;
    }

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          setJwt(data.token);
          // save token to local storage
          localStorage.setItem("token", data.token);
          // decode token to get user data
          setUser(
            JSON.parse(
              Buffer.from(data.token.split(".")[1], "base64").toString()
            )
          );
          let path = `/`;
          navigate(path);
        }
      });
  };

  // handle form change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
}
