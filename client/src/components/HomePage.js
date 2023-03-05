import { useNavigate } from "react-router-dom";

export const HomePage = (jwt, user) => {
  let navigate = useNavigate();

  const createNewSnippet = () => {
    // check if user is already logged in, redirect to login page if not
    if (jwt.jwt !== false) {
      navigate("/add-snippet");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Code snippet app</h1>
      <h2>{jwt ? `Welcome ${user.name}!` : ""}</h2>
      <button className="button" onClick={createNewSnippet}>
        +
      </button>

      <p>Some content</p>
    </div>
  );
};
