import { useState } from "react";

export const Comment = (props) => {
  const [snippetData, setSnippetData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <div className="addComment-container">
      <form
        className="addComment-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="comment">Add comment</label>
        <input
          type="String"
          placeholder="Type your comment here"
          id="comment"
          name="comment"
        />
        <button className="button" type="submit">
          Add comment
        </button>
      </form>
    </div>
  );
};
