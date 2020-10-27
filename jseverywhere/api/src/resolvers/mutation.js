const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  AuthenticationError,
  ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');

module.exports = {
  newNote: async (parent, { content }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to create a note!');
    }
    return await models.Note.create({
      content,
      author: mongoose.Types.ObjectId(user.id)
    });
  },
  updateNote: async (parent, { id, content }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to update a note!');
    }
    const note = await models.Note.findById(id);
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permission to update the note!");
    }
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content } },
      { new: true }
    );
  },
  deleteNote: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('You must be signed in to delete a note!');
    }
    const note = await models.Note.findById(id);
    if (note && String(note.author) !== user.id) {
      throw new ForbiddenError("You don't have permission to delete the note!");
    }
    try {
      await note.remove();
      return true;
    } catch (err) {
      return false;
    }
  },
  toggleFavorite: async (parent, { id }, { models, user }) => {
    if (!user) {
      throw new AuthenticationError('No user is signed in!');
    }
    let note = await models.Note.findById(id);
    console.log('--> note', note);
    const hasUser = note.favoritedBy.indexOf(user.id);
    // User exists then downvote, else upvote
    if (hasUser >= 0) {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $pull: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: -1
          }
        },
        {
          new: true // returns updated document
        }
      );
    } else {
      return await models.Note.findByIdAndUpdate(
        id,
        {
          $push: {
            favoritedBy: mongoose.Types.ObjectId(user.id)
          },
          $inc: {
            favoriteCount: 1
          }
        },
        {
          new: true // returns updated document
        }
      );
    }
  },
  signUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase(); // normalize email address
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);
    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashedPassword
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log('--> error creating user:', err);
      throw new Error('--> Error creating user account!');
    }
  },
  signIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }
    const user = await models.User.findOne({
      $or: [{ email }, { username }]
    });
    // Error invalid user
    if (!user) {
      throw new Error('--> Error signing in!');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    // Error password doesn't match
    if (!validPassword) {
      throw new Error('--> Error signing in!');
    }
    // Success send token
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  }
};
