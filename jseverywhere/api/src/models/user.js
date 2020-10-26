const mongoose = require('mongoose');
// 1. Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
// 2. Model
const User = mongoose.model('User', userSchema);
module.exports = User;
