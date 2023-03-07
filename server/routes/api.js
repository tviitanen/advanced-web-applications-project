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

//PUT route to add comments
router.put("/comment/:id", validateToken, (req, res, next) => {
  //Find user based on the user ID on the comment body
  Code.findById(req.params.id)
    .then((snippet) => {
      //Create new comment
      if (snippet) {
        snippet.comments.push(req.body.comment);
        snippet.save();
        return res.status(200).json({ snippet });
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

//PUT route to upvote & check if user has already voted
router.put("/upvote/:id", validateToken, function (req, res, _next) {
  Code.findById(req.params.id)
    .then((snippet) => {
      if (snippet) {
        if (snippet.voters.includes(req.body.userId)) {
          return res.status(403).json({ message: "You have already voted" });
        } else {
          snippet.votes += 1;
          snippet.voters.push(req.body.userId);
          snippet.save();
          return res.status(200).json({ snippet });
        }
      } else {
        return res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
});

module.exports = router;
