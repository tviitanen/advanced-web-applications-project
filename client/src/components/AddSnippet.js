import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const AddSnippet = (props) => {
  let navigate = useNavigate();
  const [snippetData, setSnippetData] = useState({});
  const jwt = props.jwt;

  const handleSubmit = (event) => {
    event.preventDefault();

    // check if user is already logged in, redirect to login page if not
    if (jwt.jwt !== false) {
      alert("You have to be logged in to add a snippet");
      return;
    }

    fetch("http://localhost:4000/api/add-data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        author: props.user.name,
        snippets: { title: snippetData.title, code: snippetData.code },
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    navigate("/");
  };

  const handleChange = (event) => {
    setSnippetData({ ...snippetData, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
      <h2>Add Code Snippet</h2>
      <form
        className="addSnippet-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="title">Title</label>
        <input
          type="String"
          required
          placeholder="Add title"
          id="title"
          name="title"
        />
        <label htmlFor="code">Code snippet</label>
        <div className="input-field">
          <textarea
            type="String"
            required
            className="materialize-textarea"
            placeholder="Type your code here"
            id="code"
            name="code"
          />
        </div>
        <button className="button" type="submit">
          Add snippet
        </button>
      </form>
    </div>
  );
};
