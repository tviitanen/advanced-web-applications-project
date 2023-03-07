import React, { useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../hooks";
import "../App.css";
import { useTranslation } from "react-i18next";

export default function SideNav(props) {
  const [slider, setSlider] = useState(false);
  const size = useWindowSize();
  const { t } = useTranslation();

  return (
    <>
      <nav className="navbar">
        <p className="sidenav-trigger" onClick={() => setSlider((s) => !s)}>
          <i className="material-icons">menu</i>
        </p>
        <div className="container">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/register">Sign up</a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="sidenav-overlay"
        onClick={() => setSlider((s) => !s)}
        style={{
          display: slider && size.width < 980 ? "block" : "none",
          opacity: "1",
        }}
      />
      <ul
        id="slide-out"
        className="sidenav"
        style={{
          transform: slider || size.width > 980 ? "translateX(0%)" : "",
          transitionProperty: "transform",
          transitionDuration: ".25s",
        }}
      >
        <li>
          <h4>{props.title}</h4>
        </li>
        {props.paths.map((elt) => (
          <li onClick={() => setSlider((s) => !s)}>
            <Link className="waves-effect" to={elt.path}>
              {elt.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
