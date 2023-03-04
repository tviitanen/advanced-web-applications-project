import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Register = (props) => {
  const [userData, setUserData] = useState({});

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="auth-form-container">
      <h2>Register</h2>
      <form
        className="register-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="name">Full name</label>
        <input name="name" id="name" placeholder="full name" />
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
        <button type="submit" className="button">
          Register
        </button>
      </form>
      <Link to="/login"> Already have an account? Login here. </Link>
    </div>
  );
};
