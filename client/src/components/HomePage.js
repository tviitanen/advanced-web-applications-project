import { useNavigate } from "react-router-dom";

export const HomePage = (props) => {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/register`;
    navigate(path);
  };

  return (
    <div>
      <button className="menu" onClick={routeChange}>
        Sign up
      </button>
      <h1>Home Page</h1>
      <h2>{props.jwt ? `Welcome ${props.user.name}!` : ""}</h2>

      <p>Some content</p>
    </div>
  );
};
