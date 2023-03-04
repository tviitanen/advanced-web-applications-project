import { useNavigate } from "react-router-dom";

export const HomePage = (props) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/register`;
    navigate(path);
  };

  const createNewSnippet = () => {
    if (props.jwt) {
      navigate("/add");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <button className="menu-button" onClick={routeChange}>
        Sign up
      </button>
      <h1>Code snippet app</h1>
      <h2>{props.jwt ? `Welcome ${props.user.name}!` : ""}</h2>
      <button className="button" onClick={createNewSnippet}>
        +
      </button>

      <p>Some content</p>
    </div>
  );
};
