var express = require("express");
var router = express.Router();

const data = [
  { id: 1, name: "foo" },
  { id: 2, name: "bar" },
  { id: 3, name: "baz" },
  { id: 4, name: "wtf" },
  { id: 5, name: "lol" },
  { id: 6, name: "n00b" },
];

/* GET data . */
router.get("/data", function (req, res, next) {
  console.log(data);
  res.json(data);
});

router.get("/data/:id", function (req, res, next) {
  res.json(data.find((data) => data.id == req.params.id));
});

module.exports = router;
