import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
    if (!jwt.jwt) {
      alert("You have to be logged in to add a comment");
      return;
    }
    fetch(`http://localhost:4000/api/comment/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ comment }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setData(data);
        setComment("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Update state when user types in comment form
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  // Upvote post
  const handleUpvote = (id) => {
    fetch(`http://localhost:4000/api/upvote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        //setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
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
                <p>Comments: {data.snippet.comments.length}</p>
                <button className="button" onClick={() => handleUpvote(id)}>
                  +1
                </button>

                {/*comments*/}
                <div className="comments-container">
                  <h3>Comments</h3>
                  {data.snippet.comments.map((comment) => (
                    <div className="comment" key={comment._id}>
                      <p>{comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/*comment form*/}
        <div className="form-container">
          <form
            className="addComment-form"
            display="none"
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
    </div>
  );
}
export default Snippet;
