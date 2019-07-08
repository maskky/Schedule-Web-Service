const {Notification, validate} = require('../models/notification.models');

exports.getNotificationByUserId = async (req, res) => {
    if(!req.params.id) return res.status(400).send('Please input user id');
    const notification = await Notification.find({editedBy: req.params.id})
        .populate('editedBy', 'name')
        .populate('modelId')
        .populate('to', 'name');
    if (!notification) return res.status(404).send('Notification not found.');
    res.send(notification);
};

exports.sendNotification = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    notification = new Notification(req.body);
    notification = await notification.save();
    res.send(notification);
};

exports.setNotificationToSeen = async (req, res) => {
    const notification = await Notification.findByIdAndUpdate(req.params.id, {seen: true}, {new: true});
    if (!notification) return res.status(404).send('Notification not found.');
    res.send(notification);
};