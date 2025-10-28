const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    username: { type: String, required: true, unique: true },
    password: String,
    settings: {
      theme: { type: String, default: "light" },
      layout: { type: String, default: "grid" },
    },
    joinedTeams: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
