const winston = require('winston');
const mongoose = require('mongoose');

// module.exports = function() {
//     mongoose.connect('mongodb://localhost/wpm', {useCreateIndex: true, useNewUrlParser: true })
//     .then(() => winston.info('Connected to MongoDB...'));
// }

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db)
      .then(() => winston.info(`Connected to ${db}...`));
  }