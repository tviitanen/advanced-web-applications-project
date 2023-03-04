const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let codeSchema = new Schema({
  author: { type: String },
  snippets: [
    {
      title: { type: String },
      date: { type: Date },
      votes: { type: Number },
      comments: [{ type: String }],
      code: { type: String },
    },
  ],
});

module.exports = mongoose.model("code", codeSchema);
