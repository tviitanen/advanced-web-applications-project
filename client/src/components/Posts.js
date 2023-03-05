import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { InputGroup, Modal, Col, Row } from "react-bootstrap";

export default function Posts(jwt, user) {
  //Setting hooks
  const [submitPost, setSubmitPostData] = useState({});
  const [post, setPostData] = useState([]);
  const [comment, setCommentData] = useState({});
  const [id, setIdData] = useState({});
  const [foundComment, setFoundComment] = useState([]);
  const [postID, setPostId] = useState({});

  //Handlers for showing and closing the comment fields
  const [show, setShow] = useState(false);
  const handleShow = (id) => {
    setShow(true);
    setPostId(id);
  };
  const handleClose = () => setShow(false);

  //Fetching posts route
  useEffect(() => {
    const value = setInterval(() => {
      fetch("/api/posts/list")
        .then((response) => response.json())
        .then((json) => {
          setPostData(json);
        });
    }, 3000);
    return () => clearInterval(value);
  }, []);

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

  //Posting posts route
  const submitPostFunction = (e) => {
    e.preventDefault();
    console.log(submitPost);

    fetch("/api/posts/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        post: submitPost.post,
        userID: jwt.user.id,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSubmitPostData(data);
      });
  };

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

  //Change of input value handlers
  const handleChangeComment = (e) => {
    setCommentData({ ...comment, [e.target.name]: e.target.value });
    setIdData({ id: e.target.id });
  };

  const handleChangePost = (e) => {
    setSubmitPostData({ ...submitPost, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Container>
        {/*Map posts to the post page*/}
        {post.map((post) => (
          <div key={post._id}>
            <Form onClick={() => handleShow(post._id)}>
              <Form.Group className="mb-4">
                <Card className="cr" style={{ marginTop: "2rem" }}>
                  <Card.Body>
                    <Form.Label>
                      <p style={{ fontSize: "40px" }}>
                        {post.author} {"Posted"}
                      </p>
                    </Form.Label>
                    <Col>{post.post}</Col>
                  </Card.Body>
                </Card>
              </Form.Group>
            </Form>
          </div>
        ))}
        {/*Modal, which opens a window on the site when a post is clicked and shows comments to the user*/}
        <Modal size="xl" show={show} onHide={handleClose} animation={false}>
          <Modal.Header>
            <Modal.Title>{postID.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row md={1} xs={1} lg={1}>
              {/*Maps comments to the modal*/}
              {foundComment.map((comment) =>
                comment.id === postID ? (
                  <Container
                    key={comment._id}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Card
                      style={{
                        marginTop: "1rem",
                        minHeight: "6rem",
                        textAlign: "center",
                        width: "60%",
                      }}
                    >
                      {comment.author} {"commented"}
                      <Card.Body>{comment.comment}</Card.Body>
                    </Card>
                  </Container>
                ) : null
              )}
            </Row>
          </Modal.Body>
          {/*Form for commenting*/}
          <Form onSubmit={submitComments} onChange={handleChangeComment}>
            <Modal.Footer>
              <Container fluid="md">
                <Form.Group>
                  {jwt.jwt ? (
                    <InputGroup>
                      <Form.Control
                        type="comment"
                        name="comment"
                        id={postID}
                        placeholder={"Write a comment"}
                      ></Form.Control>
                      <Button type="submit" id="commentBTN">
                        {"Comment"}
                      </Button>
                    </InputGroup>
                  ) : (
                    <InputGroup>
                      <Form.Control
                        disabled
                        type="comment"
                        name="comment"
                        id={postID}
                        placeholder={"You must login to comment"}
                      ></Form.Control>
                      <Button disabled type="submit" id="commentBTN">
                        {"Comment"}
                      </Button>
                    </InputGroup>
                  )}
                </Form.Group>
              </Container>
            </Modal.Footer>
          </Form>
          <Button variant="secondary" onClick={handleClose}>
            {"Close"}
          </Button>
        </Modal>
      </Container>
      {/*Posting new posts function*/}
      <Container style={{ marginBottom: "4rem" }}>
        <h1>{"Submit New Post Here!"}</h1>
        <Form onSubmit={submitPostFunction} onChange={handleChangePost}>
          <Form.Group>
            {jwt.jwt ? (
              <InputGroup>
                <Form.Control
                  type="post"
                  name="post"
                  placeholder={"Submit a code snippet!"}
                ></Form.Control>
                <Button type="submit" id="postBTN">
                  {"POST"}
                </Button>
              </InputGroup>
            ) : (
              <InputGroup>
                <Form.Control
                  disabled
                  type="post"
                  name="post"
                  placeholder={"You must login to post"}
                ></Form.Control>
                <Button disabled type="submit" id="postBTN">
                  {"POST"}
                </Button>
              </InputGroup>
            )}
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
