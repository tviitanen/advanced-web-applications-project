const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let codeSchema = new Schema({
  author: { type: String },
  title: { type: String },
  date: { type: Date },
  code: { type: String },
});

module.exports = mongoose.model("code", codeSchema);
