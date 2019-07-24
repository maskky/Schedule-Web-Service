const mongoose = require('mongoose');
const Joi = require('joi');

const Contact = mongoose.model('Contact', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        lowercase: true
    },
    title: String,
    nativeName: String,
    priority: {
        type: Number,
        default: 99
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    dob: Date,
    nationality: String,
    address: String,
    tel: [String],
    email: [String],
    position: [{
        positionName: String,
        partnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Partner'
        },
        updatedDate: {
            type: Date,
            default: Date.now()
        }
    }],
    awarenessInfo: String,
    imgUrl: String,
    gift: [{
        giftImg: String,
        description: String
    }],
    status: {
        type: String,
        enum: ['active', 'inactive'],
	default: 'active'
    },
    editedBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: String, 
        default: Date.now()
    }
}));

function validateContact(contact){
    const schema = {
        name: Joi.string().min(3),
        title: Joi.string(),
        nativeName: Joi.string(),
        priority: Joi.number(),
        gender: Joi.valid('male', 'female'),
        dob: Joi.date(),
        nationality: Joi.string(),
        address: Joi.string(),
        tel: Joi.array().items(Joi.string()),
        email: Joi.array().items(Joi.string().email()),
        position: Joi.array().items({
            positionName: Joi.string().required(),
            partnerId: Joi.objectId().required()
        }),
        awarenessInfo: Joi.string(),
        imgUrl: Joi.string(),
        gift: Joi.array().items({
            giftImg: Joi.string().required(),
            description: Joi.string().required()
        }),
        status: Joi.valid('active', 'inactive'),
        editedBy: Joi.objectId(),
    };
    return Joi.validate(contact, schema);
}

exports.Contact = Contact;
exports.validate = validateContact;
