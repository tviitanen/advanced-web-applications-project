import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";
import { useTranslation } from "react-i18next";

function SnippetList(jwt) {
  const [snippetData, setSnippetData] = useState([]);
  let navigate = useNavigate();
  const { t } = useTranslation();

  // highlight.js for syntax highlighting
  useEffect(() => {
    hljs.highlightAll();
  });

  const createNewSnippet = () => {
    // check if user is already logged in, redirect to login page if not
    if (jwt.jwt !== false) {
      navigate("/add-snippet");
    } else {
      navigate("/login");
    }
  };

  const openSnippet = (id) => {
    navigate("/snippets/" + id);
  };

  //Fetch posts
  useEffect(() => {
    async function getSnippets() {
      fetch("http://localhost:4000/api/list")
        .then((response) => response.json())
        .then((json) => {
          setSnippetData(json);
        });
      return () => {};
    }
    getSnippets();
  }, []); // empty array means this effect will only run once (like componentDidMount in classes)

  // Don't render until we have data
  if (snippetData === null || snippetData === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="snippet-list">
      {jwt.jwt ? (
        <button className="float" onClick={createNewSnippet}>
          Add new Code Snippet
        </button>
      ) : (
        ""
      )}
      <div className="snippet-container">
        {/*Maps posts to the page*/}
        <div className="row">
          {snippetData.map((snippetData) => (
            <div className="col s12 m6">
              <div className="card grey darken-3">
                <div className="card-content white-text">
                  <span className="card-title">{snippetData.title}</span>
                  <pre>
                    <code>{snippetData.code}</code>
                  </pre>
                  <p>Author: {snippetData.author}</p>
                  <div className="card-action"></div>
                  {jwt.jwt ? (
                    <button
                      className="button"
                      onClick={() => openSnippet(snippetData._id)}
                    >
                      Open
                    </button>
                  ) : (
                    ""
                  )}
                  <p>Votes: {snippetData.votes} </p>
                  <p>Comments: {snippetData.comments.length}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SnippetList;
