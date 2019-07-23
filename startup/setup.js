const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser= require('body-parser');
const events = require('../routes/event.route');
const users = require('../routes/user.route');
const partners = require('../routes/partner.route');
const contacts = require('../routes/contact.route');
const uploadimg = require('../routes/uploadimg.route');
const uploadpdf = require('../routes/uploadpdf.route');
const search = require('../routes/search.route');
const notification = require('../routes/notification.route');
const error = require('../middleware/error');
const fs = require('fs');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(cors());
    app.use(morgan('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));
    app.use('/images', express.static('images'));
    app.use('/documents', express.static('documents'));
    app.use('/api/events', events);
    app.use('/api/users', users);
    app.use('/api/partners', partners);
    app.use('/api/contacts', contacts);
    app.use('/api/uploadimg', uploadimg);
    app.use('/api/uploadpdf', uploadpdf);
    app.use('/api/search', search);
    app.use('/api/notifications', notification);
    app.use(error);
}
