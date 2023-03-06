import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { InputGroup, Modal, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SnippetData(jwt) {
  const [snippetData, setSnippetData] = useState([]);
  const [comment, setCommentData] = useState({});
  const [id, setIdData] = useState({});
  const [postID, setPostId] = useState({});
  const [foundComment, setFoundComment] = useState([]);
  const [show, setShow] = useState(false);
  let navigate = useNavigate();

  const createNewSnippet = () => {
    // check if user is already logged in, redirect to login page if not
    if (jwt.jwt !== false) {
      navigate("/add-snippet");
    } else {
      navigate("/login");
    }
  };

  const handleShow = (id) => {
    setShow(true);
    setPostId(id);
  };
  //Fetch posts
  useEffect(() => {
    const value = setInterval(() => {
      fetch("http://localhost:4000/api/list")
        .then((response) => response.json())
        .then((json) => {
          setSnippetData(json);
        });
    }, 3000);
    return () => {
      clearInterval(value);
    };
  }, [snippetData]);

  //Fetching comments route
  useEffect(() => {
    const value = setInterval(() => {
      fetch("/api/posts/commentsList")
        .then((response) => response.json())
        .then((json) => {
          setFoundComment(json);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 3000);
    return () => clearInterval(value);
  }, []);

  //Posting comments route
  const submitComments = (e) => {
    e.preventDefault();
    console.log("ID:", id);
    console.log("Comment:", comment);

    fetch("/api/posts/comments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment: comment.comment,
        id: id.id,
        userID: jwt.user.id,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setCommentData(data.comment);
        setIdData(data.id);
      });
  };

  return (
    <div className="container">
      <button className="button" onClick={createNewSnippet}>
        +
      </button>
      {/*Maps posts to the page*/}
      {snippetData.map((snippetData) => (
        <div key={snippetData._id} className="row">
          <div className="col s12">
            <div className="card grey darken-3">
              <div className="card-content white-text">
                <span className="card-title">{snippetData.title}</span>
                <p>{snippetData.code}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SnippetData;
