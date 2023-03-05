var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Code = require("../models/Code");
const Comment = require("../models/Comment");
const validateToken = require("../auth/validateToken.js");
const multer = require("multer");
const storage = multer.memoryStorage();

/* GET snippet data from the DB. */
router.get("/snippets/list", async (req, res, next) => {
  await Code.find({}).then((codes) => {
    console.log(codes);
    if (!codes) return res.status(404).json({ message: "No codes found" });
    return res.json(codes);
  });
});

/* POST route to post code snippet */
router.post("/snippets/post", (req, res, next) => {
  new Code({
    author: req.body.author,
    title: req.body.title,
    code: req.body.code,
  }).save();
  return res.json({ message: "Code snippet saved" });
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
      author: name.username,
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
