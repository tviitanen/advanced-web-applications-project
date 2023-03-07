import { useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
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
    async function getSnippet() {
      console.log(id);
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
          console.log(data.snippet.title);
          setData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    getSnippet();
  }, [id]);

  // Don't render until we have data
  if (data === null || data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div key={""} className="row">
        <div className="col s12">
          <div className="card grey darken-3 ">
            <div className="card-content white-text">
              <span className="card-title">{data.snippet.title}</span>
              <p>{}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Snippet;
