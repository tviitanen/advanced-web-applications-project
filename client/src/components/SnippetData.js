import { useEffect, useState } from "react";

function SnippetData() {
  const [snippetData, setSnippetData] = useState([]);

  //Fetch posts
  useEffect(() => {
    const value = setInterval(() => {
      fetch("http://localhost:4000/api/snippets/list")
        .then((response) => response.json())
        .then((json) => {
          setSnippetData(json);
        });
    }, 3000);
    return () => clearInterval(value);
  }, []);

  return (
    <div className="container">
      {snippetData.map((snippetData) => (
        <div key={snippetData._i} className="row">
          <div className="col s12 m6">
            <div className="card grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">{snippetData.title}</span>
                <p>{snippetData.code}</p>
              </div>
              <div class="card-action">
                <a href="#">Comment</a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SnippetData;
