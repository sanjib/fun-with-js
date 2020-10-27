// Provides connect and close
const mongoose = require('mongoose');
module.exports = {
  // 1. Connect
  connect: DB_HOST => {
    mongoose.set('useNewUrlParser', true); // Use updated URL string parser
    mongoose.set('useFindAndModify', false); // Use findOneAndUpdate instead of useFindAndModify
    mongoose.set('useCreateIndex', true); // Use createIndex instead of ensureIndex
    mongoose.set('useUnifiedTopology', true); // Use new server discovery & monitoring feature

    mongoose.connect(DB_HOST); // Now connect to db
    // Log success
    mongoose.connection.on('connected', function() {
      console.log(`--> MongoDB conn success ${DB_HOST}`);
    });
    // Log error in case of connection fail
    mongoose.connection.on('error', err => {
      console.error(err);
      console.log(`--> MongoDB conn err ${DB_HOST}`);
      process.exit();
    });
  },
  // 2. Close
  close: () => {
    mongoose.connection.close();
  }
};
