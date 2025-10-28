const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: String,
    owner: String,
    tasks: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Board", boardSchema);
