const {Contact, validate} = require('../models/contact.model');

exports.getAllContacts = async (req, res) => {
    const contacts = await Contact.find()
        .where('status').ne('inactive')
        .populate('position.partnerId', 'name')
        .populate('editedBy', 'name');
    res.send(contacts);
};

exports.getContactById = async (req, res) => {
    const contact = await Contact.findById(req.params.id)
        .populate('position.partnerId', 'name')
        .populate('editedBy', 'name');
    if (!contact) return res.status(404).send('Contact not found.');
    res.send(contact);
};

exports.createContact = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let contact = await Contact.find({name : req.body.name});
    if (contact.length) return res.status(400).send('Name "' + req.body.name + '" is alreay exists.');
    contact = new Contact(req.body);
    contact = await contact.save();
    res.send(contact);
};

exports.updateContact = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!contact) return res.status(404).send('Contact not found.');
    res.send(contact);
};

// exports.deleteContact = async (req, res) => {
//     try {
//         const contact = await Contact.findByIdAndRemove(req.params.id);
//         if (!contact) return res.status(404).send('Contact not found.');
//         res.send(contact);
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// };

exports.deleteContact = async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.id, {status: 'inactive'}, {new: true});
    if (!contact) return res.status(404).send('Contact not found.');
    res.send(contact);
    res.status(400).send(err.message);
};