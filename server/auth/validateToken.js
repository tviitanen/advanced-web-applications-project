const jwt = require("jsonwebtoken");

// This is the middleware that checks if the user is logged in
module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }
  if (token == null) return res.sendStatus(401).send("Unauthorized");
  console.log("Token found");
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.sendStatus(403).send("Forbidden");
    req.user = user;
    next();
  });
};
