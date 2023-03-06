const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let codeSchema = new Schema({
  author: { type: String },
  title: { type: String },
  code: { type: String },
  votes: { type: Number },
  voters: { type: Array },
  comments: { type: Array },
});

module.exports = mongoose.model("code", codeSchema);
