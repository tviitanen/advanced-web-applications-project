var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Code = require("../models/Code");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

/* GET code data. */
router.get("/data", (req, res, next) => {
  Code.find({}, (err, codes) => {
    if (err) return next(err);
    console.log(data);
    res.json(codes);
  });
});

/* POST code snippet */
router.post("/data", validateToken, (req, res, next) => {
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
      return res.send(req.body);
    });
  });
});

module.exports = router;
