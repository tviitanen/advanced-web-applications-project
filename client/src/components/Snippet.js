import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

function Snippet() {
  // highlight.js for syntax highlighting
  useEffect(() => {
    hljs.highlightAll();
  });
}

export default Snippet;
