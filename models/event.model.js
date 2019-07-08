const mongoose = require('mongoose');
const Joi = require('joi');

const Event = mongoose.model('Event', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3
    },
    eventType: {
        type: String,
        lowercase: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    startTime: String,
    endTime: String,
    venue: String,
    country: String,
    kbankParticipant: [{
        position: String,
        contactId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact'
        }
    }],
    partnerParticipant: [{
        position: String,
        contactId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contact'
        }
    }],
    callLog: {
        type: String,
        max: 1000
    },
    pdfUrl: String,
    eventImgUrl: [String],
    editedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: String, 
        default: Date.now()
    }
}));

function validateEvent(event){
    const schema = {
        title: Joi.string().min(3),
        eventType: Joi.string(),
        date: Joi.date(),
        startTime: Joi.date(),
        endTime: Joi.date(),
        venue: Joi.string(),
        country: Joi.string(),
        kbankParticipant: Joi.array().items({
            position: Joi.string(),
            contactId: Joi.objectId()
        }),
        partnerParticipant: Joi.array().items({
            position: Joi.string(),
            contactId: Joi.objectId()
        }),
        callLog: Joi.string().max(1000),
        pdfUrl: Joi.string(),
        eventImgUrl: Joi.array().items(Joi.string()),
        editedBy: Joi.objectId(),
    };
    return Joi.validate(event, schema);
}

exports.Event = Event;
exports.validate = validateEvent;