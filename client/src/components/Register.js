import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// REGISTER PAGE
export const Register = (jwt) => {
  const [userData, setUserData] = useState({});

  let navigate = useNavigate();
  const { t } = useTranslation();

  // register data to be sent to server on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if user is already logged in, redirect to home page
    if (jwt.jwt !== false) {
      alert(t("alreadyLoggedIn"));
      return;
    }
    console.log(userData.email);

    fetch("http://localhost:4000/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === true) {
          alert("registerSuccess");
          setUserData(data);
          let path = `/login`;
          navigate(path);
        } else {
          alert("registerFail");
        }
        console.log(data);
      });
  };
  // handle form change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h2>{t("register")}</h2>
      <form
        className="register-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="name">{t("fullName")}</label>
        <div className="input-field">
          <input name="name" id="name" required placeholder={t("fullName")} />
        </div>
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
        <button type="submit" className="button">
          {t("register")}
        </button>
      </form>
      <Link to="/login"> {t("registerExisting")} </Link>
    </div>
  );
};
