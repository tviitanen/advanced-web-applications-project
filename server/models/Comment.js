const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Schema for comments
let commentSchema = new Schema({
  id: { type: String },
  comment: { type: String },
  author: { type: String },
});

module.exports = mongoose.model("comment", commentSchema);
