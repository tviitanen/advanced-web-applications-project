var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Code = require("../models/Code");
const validateToken = require("../auth/validateToken");

// GET snippet data from the DB.
router.get("/list", async (req, res, next) => {
  await Code.find({})
    .then((snippets) => {
      console.log(snippets);
      if (!snippets) return res.status(404).json({ message: "No codes found" });
      return res.status(200).json(snippets);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

//GET a single snippet by id
router.get("/:id", function (req, res, next) {
  Code.findById(req.params.id)
    .then((snippet) => {
      return res.status(200).json({ snippet });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

// POST route to post code snippet
router.post("/post", validateToken, (req, res, next) => {
  Code.create({
    author: req.body.author,
    title: req.body.title,
    code: req.body.code,
    votes: 0,
    voters: [],
    comments: [],
  })
    .then((snippet) => {
      return res.status(200).json({ message: "Code snippet saved" });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

//GET route for comments
router.get("/comments/list", async (req, res, next) => {
  //Find comments from the database
  await Comment.find({}).then((comment) => {
    if (!comment) {
      return res.status(404).json({ message: "No comments yet" });
    } else {
      return res.json(comment);
    }
  });
});

//POST route for comments
router.post("/comments/post", async (req, res, next) => {
  //Find user based on the user ID on the comment body
  await User.findOne({ _id: req.body.userID }).then((name) => {
    //Create new comment
    const newComment = new Comment({
      id: req.body.id,
      comment: req.body.comment,
      author: name.name,
    });
    newComment
      .save()
      .then(() => {
        return res.json({ message: "Comment saved" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
