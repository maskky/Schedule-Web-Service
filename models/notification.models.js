const mongoose = require('mongoose');
const Joi = require('joi');

const Notification = mongoose.model('Notification', new mongoose.Schema({
    modelId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Event', 'Partner', 'Contact']
    },
    to: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    actionType: {
        required: true,
        type: String,
        enum: ['event', 'partner', 'contact']
    },
    editedField: [{
        type: String,
        required: true
    }],
    editedBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	seen: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: String, 
        default: Date.now()
    }
}));

function validateNotification(notification){
    const schema = {
        modelId: Joi.objectId(),
        onModel: Joi.valid('Event', 'Partner', 'Contact'),
        to: Joi.objectId(),
        actionType: Joi.valid('event', 'partner', 'contact'),
        editedField: Joi.array().items(Joi.string()),
        editedBy: Joi.objectId(),
        seen: Joi.boolean()
    };
    return Joi.validate(notification, schema);
}

exports.Notification = Notification;
exports.validate = validateNotification;