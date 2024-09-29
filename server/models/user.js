const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// Create and export the User model
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
