const mongoose = require('mongoose');
// 1. Schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
// 2. Model
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
