const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  settings: {
    theme: { type: String, default: 'light' },
    layout: { type: String, default: 'grid' }
  },
  joinedTeams: Array
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
