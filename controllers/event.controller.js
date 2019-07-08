const {Event, validate} = require('../models/event.model');

exports.getAllEvents = async (req, res) => {
    const {date, participantid} = req.query;
    let query = {};
    if (date) query.date = date;
    if (participantid) query.kbankParticipant = participantid;
    const events = await Event.find(query)
        .populate('kbankParticipant.contactId', 'name')
        .populate('partnerParticipant.contactId', 'name')
        .populate('editedBy', 'name');
    res.send(events);
};

exports.getEventById = async (req, res) => {
    const event = await Event.findById(req.params.id)
        .populate('kbankParticipant.contactId', 'name')
        .populate('partnerParticipant.contactId', 'name')
        .populate('editedBy', 'name');
    if (!event) return res.status(404),send('Event not found.');
    res.send(event);
};

exports.createEvent = async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let event = new Event(req.body);
    event = await event.save();
    res.send(event);
};

exports.updateEvent = async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!event) return res.status(404).send('Event not found.');
    res.send(event);
};

exports.deleteEvent = async (req, res) => {
    const event = await Event.findByIdAndRemove(req.params.id);
    if (!event) return res.status(404).send('Course not found.');
    res.send(event);
};