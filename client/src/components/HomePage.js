import { useNavigate } from "react-router-dom";

export const HomePage = (jwt) => {
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
      {jwt.jwt ? (
        <div>
          <h3>Welcome {jwt.user.name}!</h3>
          <button className="button" onClick={createNewSnippet}>
            Add new Code Snippet
          </button>
        </div>
      ) : (
        <div>
          <h3>Please login to add a new snippet</h3>
          <button className="button" onClick={createNewSnippet}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};
