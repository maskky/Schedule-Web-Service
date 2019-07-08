const {Event} = require('../models/event.model');
const {Partner} = require('../models/partner.model');
const {Contact} = require('../models/contact.model');
const {User} = require('../models/user.model');

exports.globalSearch = async (req, res) => {
    if (!req.query.keyword) return res.status(400).send('Please input a keyword.');

    const events = await Event.find({title: {$regex: "^" + req.query.keyword + ".*", $options: 'i'}})
        .populate('kbankParticipant', 'name')
        .populate('partnerParticipant', 'name')
        .populate('editedBy', 'name');

    const partners = await Partner.find({name: {$regex: "^" + req.query.keyword + ".*", $options: 'i'}})
        .where('status')
        .ne('inactive')
        .populate('editedBy', 'name');

    const contacts = await Contact.find({name: {$regex: "^" + req.query.keyword + ".*", $options: 'i'}})
        .where('status')
        .ne('inactive')
        .populate('position.partnerId', 'name')
        .populate('editedBy', 'name');

    res.status(200).json({events, partners, contacts});
};

exports.searchUser = async (req, res) => {
    let query = {};
    if (req.query.username) query.username = {$regex: "^" + req.query.username + ".*", $options: 'i'};
    if (req.query.name) query.name = {$regex: "^" + req.query.name + ".*", $options: 'i'};
    if (req.query.role) query.role = {$regex: "^" + req.query.role + ".*", $options: 'i'};
    if (req.query.team) query.team = {$regex: "^" + req.query.team + ".*", $options: 'i'};
    const users = await User.find(query);
    res.send(users);
};

exports.searchEvent = async (req, res) => {
    User.find({team: req.query.team}, async function(err, users) {
        var ids = users.map(function(user) { return user._id; });

        let query = {};
        if (req.query.title) query.title = {$regex: "^" + req.params.keyword + ".*", $options: 'i'};
        if (req.query.eventtype) query.eventType = {$regex: "^" + req.params.eventtype + ".*", $options: 'i'};
        if (req.query.date) query.date = req.query.date;
        if (req.query.country) query.country = {$regex: "^" + req.params.country + ".*", $options: 'i'};
        if (req.query.continent) query.continent = {$regex: "^" + req.params.continent + ".*", $options: 'i'};
        if (req.query.venue) query.venue = {$regex: "^" + req.params.venue + ".*", $options: 'i'};
        query.editedBy = {$in: ids};
    
        await Event.find(query)
            .populate('editedBy')
            .populate('kbankParticipant', 'name')
            .populate('partnerParticipant', 'name')
            .exec(function(err, events) {
                res.send(events);
        });
    });

};

exports.searchPartner = async (req, res) => {
    let query = {};
    if (req.query.name) query.name = {$regex: "^" + req.query.name + ".*", $options: 'i'}
    if (req.query.partnertype) query.partnerType = {$regex: "^" + req.query.partnertype + ".*", $options: 'i'};
    if (req.query.continent) query.continent = {$regex: "^" + req.query.continent + ".*", $options: 'i'};
    if (req.query.country) query.country = {$regex: "^" + req.query.country + ".*", $options: 'i'};
    if (req.query.address) query.address = {$regex: "^" + req.query.address + ".*", $options: 'i'};

    const partners = await Partner.find(query)
        .where('status').ne('inactive').populate('editedBy', 'name');
    res.send(partners);
};

exports.searchContact = async (req, res) => {
    let query = {};
    if (req.query.name) query.name = {$regex: "^" + req.query.name + ".*", $options: 'i'};
    if (req.query.nationality) query.nationality = {$regex: "^" + req.query.nationality + ".*", $options: 'i'};
    if (req.query.tel) query.tel = {$regex: "^" + req.query.tel + ".*", $options: 'i'};
    if (req.query.email) query.tel = {$regex: "^" + req.query.email + ".*", $options: 'i'};

    const contacts = await Contact.find(query)
        .where('status').ne('inactive').populate('editedBy', 'name');
    res.send(contacts);
};