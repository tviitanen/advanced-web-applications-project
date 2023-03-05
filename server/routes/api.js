var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Code = require("../models/Code");
const Comment = require("../models/Comment");
const validateToken = require("../auth/validateToken.js");
const multer = require("multer");
const storage = multer.memoryStorage();

/* GET code data from the DB. */
router.get("/snippets/list", async (req, res, next) => {
  await Code.find({}, (err, codes) => {
    if (err) return next(err);
    if (!codes) return res.status(404).json({ message: "No codes found" });
    res.json(codes);
  });
});

/* POST route to post code snippet */
router.post("/snippets/post", validateToken, (req, res, next) => {
  Code.findOne({ author: req.body.author }, (err, code) => {
    if (err) return next(err);
    new Code({
      author: req.body.author,
      snippets: [
        {
          title: req.body.title,
          date: Date.now(),
          votes: 0,
          comments: "",
          code: req.body.code,
        },
      ],
    }).save((err) => {
      if (err) return next(err);
      return res.json({ message: "Code snippet saved" });
    });
  });
});

//GET route for comments
router.get("/comments/list", async (req, res, next) => {
  //Find comments from the database
  await Comment.find({}).then((comment) => {
    if (!comment) {
      return res.status(404).json({ message: "No comments found" });
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
      author: name.username,
    });
    newComment
      .save()
      .then(() => {
        return res.json({ message: "Commented!" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;

module.exports = router;
