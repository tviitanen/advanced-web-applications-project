import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

function Snippet() {
  const [data, setData] = useState();
  const [comment, setComment] = useState("");
  const { id } = useParams();

  // highlight.js for syntax highlighting
  useEffect(() => {
    hljs.highlightAll();
  });

  // Fetch post
  useEffect(() => {
    async function getPost() {
      fetch(`http://localhost:4000/api/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setData(data.post);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getPost();
  }, [id]);
}
export default Snippet;
