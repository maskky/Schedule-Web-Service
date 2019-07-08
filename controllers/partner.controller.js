const {Partner, validate} = require('../models/partner.model');

exports.getAllPartners = async (req, res) => {
    const partners = await Partner.find().where('status').ne('inactive').populate('editedBy', 'name');
    res.send(partners);
};

exports.getPartnerById = async (req, res) => {
    const partner = await Partner.findById(req.params.id).populate('editedBy', 'name');
    if (!partner) return res.status(404).send('Partner not found.');
    res.send(partner);
};

exports.createPartner = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let partner = await Partner.find({name : req.body.name});
    if (partner.length) return res.status(400).send('Name "' + req.body.name + '" is alreay exists.');
    partner = new Partner(req.body);
    partner = await partner.save();
    res.send(partner);
};

exports.updatePartner = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!partner) return res.status(404).send('Partner not found.');
    res.send(partner);
};

// exports.deletePartner = async (req, res) => {
//     try {
//         const partner = await Partner.findByIdAndRemove(req.params.id);
//         if (!partner) return res.status(404).send('Partner not found.');
//         res.send(partner);
//     } catch (err) {
//         res.status(400).send(err.message);
//     }
// };

exports.deletePartner = async (req, res) => {
    const partner = await Partner.findByIdAndUpdate(req.params.id, {status: 'inactive'}, {new: true});
    if (!partner) return res.status(404).send('Partner not found.');
    res.send(partner);
};