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
    if (localStorage.getItem("token") !== null) {
      alert(t("alreadyLoggedIn"));
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
          alert(t("loginSuccess"));
          navigate(path);
        } else {
          alert(t("loginFail"));
        }
      });
  };

  // handle form change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2>{t("login")}</h2>
      <form
        className="login-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="email">{t("email")}</label>
        <div className="input-field">
          <input
            type="email"
            required
            placeholder="youremail@mail.com"
            id="email"
            name="email"
          />
        </div>
        <label htmlFor="password">{t("password")}</label>
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
          {t("login")}
        </button>
      </form>
      <Link to="/register"> {t("loginNonExisting")} </Link>
    </div>
  );
}
