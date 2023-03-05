import { useNavigate } from "react-router-dom";

export const HomePage = (jwt) => {
  let navigate = useNavigate();

  const createNewSnippet = () => {
    // TODO: check if user is already logged in, redirect to login page if not
    if (jwt.jwt !== false) {
      console.log(jwt.jwt);
      navigate("/add-snippet");
    } else {
      console.log(jwt.jwt);
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Code snippet app</h1>
      <h2>{jwt.jwt ? `Welcome ${jwt.user.name}!` : ""}</h2>
      <button className="button" onClick={createNewSnippet}>
        +
      </button>

      <p>Some content</p>
    </div>
  );
};
