var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Login POST route
router.post("/login", upload.none(), async (req, res, next) => {
  await User.findOne({ email: req.body.email }).then((user) => {
    //If user is not found in the database, the login fails
    if (!user) {
      return res.status(403).json({ message: "Login failed" });
    } else {
      //If user is found, then compare the passwords
      bcrypt.compare(req.body.password, user.password, (err, found) => {
        if (found) {
          //Make jwt
          const jwtPayload = {
            id: user._id,
            name: user.name,
          };
          //Sign jwt
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 120,
            },
            (err, token) => {
              if (err) throw err;
              //Respond with jwt token
              res.json({ success: true, token });
            }
          );
        } else {
          res.status(403).json({ message: "Invalid credentials" });
        }
      });
    }
  });
});

// Register POST route
router.post(
  "/register",
  //Set lenght requirements for POST body
  body("name").isLength({ min: 3 }).escape(),
  body("email").isEmail().trim().escape(),
  body("password").isLength({ min: 5 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (req.body.name < 3 || req.body.password < 5) {
      return res.status(400).json({ message: "Password or name too short" });
    } else if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    //Check if email is already in the database
    await User.findOne({ email: email })
      .then((user) => {
        if (user) {
          return res.status(403).json({ message: "Email already in use" });
        } else {
          //Hash the password
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, (err, hash) => {
              //Save new user into the database
              const newUser = new User(
                {
                  name: name,
                  email: email,
                  password: hash,
                },
                (err, ok) => {
                  if (err) throw err;
                }
              );
              newUser
                .save()
                .then(() => {
                  return res.send(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        }
      })
      .catch((error) => {
        throw error;
      });
  }
);

module.exports = router;
