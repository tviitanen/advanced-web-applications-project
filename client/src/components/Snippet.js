import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { useTranslation } from "react-i18next";

function Snippet(jwt, user) {
  const [data, setData] = useState();
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { t } = useTranslation();

  // highlight.js for syntax highlighting
  useEffect(() => {
    hljs.highlightAll();
  });

  const isLoggedIn = () => {
    if (localStorage.getItem("token") === null) {
      alert(t("loginToVote"));
      return;
    }
  };

  // POST request to add comment
  const handleSubmit = (event) => {
    event.preventDefault();
    // check if user is logged in
    isLoggedIn();
    console.log(jwt.user.name);
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
    setComment(e.target.value + " - " + jwt.user.name);
  };

  // Upvote post
  const handleUpvote = (id) => {
    // check if user is logged in
    isLoggedIn();

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
        // Update state
        setData(data);
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
    return <div>{t("loading")}</div>;
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
                <p>
                  {t("author")}: {data.snippet.author}
                </p>
                <div className="card-action"></div>
                <p>
                  {t("votes")}: {data.snippet.votes}{" "}
                </p>
                <p>
                  {t("comments")}: {data.snippet.comments.length}
                </p>
                {localStorage.getItem("token") ? (
                  <button className="button" onClick={() => handleUpvote(id)}>
                    +1
                  </button>
                ) : (
                  <></>
                )}
                {/*comments*/}
                <div className="comments-container">
                  <h3>{t("comments")}</h3>
                  {/*Render comments if there are any*/}
                  {data.snippet.comments.length > 0 ? (
                    data.snippet.comments.map((comment) => (
                      <div className="comment" key={comment._id}>
                        <p>{comment}</p>
                      </div>
                    ))
                  ) : (
                    <p>{t("noComments")}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {/*comment form*/}
        {localStorage.getItem("token") ? (
          <div className="form-container">
            <form
              className="addComment-form"
              display="none"
              onSubmit={handleSubmit}
              onChange={handleChange}
            >
              <h3>{t("addComment")}</h3>
              <label htmlFor="comment">{t("addComment")}</label>
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
                {t("addComment")}
              </button>
            </form>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default Snippet;
