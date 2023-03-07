import { useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

function Snippet(jwt, user) {
  const [data, setData] = useState();
  const [comment, setComment] = useState("");
  const { id } = useParams();

  // highlight.js for syntax highlighting
  useEffect(() => {
    hljs.highlightAll();
  });

  // POST request to add comment
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!jwt) {
      alert("You have to be logged in to add a comment");
      return;
    }
    fetch("http://localhost:4000/api/add-data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        author: user.name,
        comments: data.comment,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  // Update state when user types in form
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  // Fetch snippet data from server
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
    <div>
      {/*snippet*/}
      <div className="snippet-container">
        <div className="row">
          <div className="col s12">
            <div className="card grey darken-3">
              <div className="card-content white-text">
                <span className="card-title">{data.snippet.title}</span>
                <pre>
                  <code>{data.snippet.code}</code>
                </pre>
                <p>Author: {data.snippet.author}</p>
                <div className="card-action"></div>
                <p>Votes: {data.snippet.votes} </p>
                <p>Comments: {data.snippet.comment}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*comment form*/}
      <div className="form-container">
        <form
          className="addComment-form"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
          <h3>Add comment</h3>
          <label htmlFor="comment">Add comment</label>
          <div className="input-field">
            <textarea
              type="String"
              required
              className="materialize-textarea"
              placeholder="Type your comment here"
              id="comment"
              name="comment"
            />
          </div>
          <button className="button" type="submit">
            Add comment
          </button>
        </form>
      </div>
    </div>
  );
}
export default Snippet;
