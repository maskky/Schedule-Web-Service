const winston = require('winston');
const logo = require('asciiart-logo');
const config = require('./package.json');
const express = require('express');
const app = express();

console.log(logo(config).render());

require('./startup/logging')();
require('./startup/setup')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/production')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));