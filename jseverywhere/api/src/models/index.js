// Combines all the models in a single object
// called models.
const Note = require('./note');
const User = require('./user');
const models = {
  Note,
  User
};
module.exports = models;
