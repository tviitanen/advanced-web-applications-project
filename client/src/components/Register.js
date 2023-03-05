import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// REGISTER PAGE
export const Register = (jwt) => {
  const [userData, setUserData] = useState({});

  let navigate = useNavigate();

  // register data to be sent to server on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // check if user is already logged in, redirect to home page
    if (jwt !== false) {
      console.log(jwt);
      alert("You are already logged in");
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
          alert("Registration successful");
          setUserData(data);
          let path = `/login`;
          navigate(path);
        } else {
          alert("Error occurred");
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
      <h2>Register</h2>
      <form
        className="register-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="name">Full name</label>
        <div className="input-field">
          <input name="name" id="name" required placeholder="full name" />
        </div>
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
        <button type="submit" className="button">
          Register
        </button>
      </form>
      <Link to="/login"> Already have an account? Login here. </Link>
    </div>
  );
};
