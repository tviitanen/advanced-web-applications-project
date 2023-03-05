import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Comment = (props) => {
  const [snippetData, setSnippetData] = useState({});
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/`;
    navigate(path);
  };
  const jwt = props.jwt;

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
        author: props.user.name,
        snippets: { title: snippetData.title, comments: snippetData.comment },
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleChange = (event) => {
    setSnippetData({ ...snippetData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <button className="menu-button" onClick={routeChange}>
        Home
      </button>
      <div className="form-container">
        <form
          className="addComment-form"
          onSubmit={handleSubmit}
          onChange={handleChange}
        >
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
};
