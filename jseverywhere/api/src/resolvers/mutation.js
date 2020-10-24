module.exports = {
  newNote: async (parent, { content, author }, { models }) =>
    await models.Note.create({ content, author }),
  updateNote: async (parent, { id, content, author }, { models }) => {
    return await models.Note.findOneAndUpdate(
      { _id: id },
      { $set: { content, author } },
      { new: true }
    );
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch (err) {
      return false;
    }
  }
};
