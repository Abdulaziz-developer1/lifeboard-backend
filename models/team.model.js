const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  members: Array,
  boards: Array
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
