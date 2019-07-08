const mongoose = require('mongoose');
const Joi = require('joi');

const Partner = mongoose.model('Partner', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        lowercase: true
    },
    priority: {
        type: Number,
        default: 99
    },
    continent: String,
    country: String,
    partnerType: String,
    address: String,
    tel: [String],
    imgUrl: String,
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

function validatePartner(partner){
    const schema = {
        name: Joi.string().min(3),
        priority: Joi.number(),
        continent: Joi.string(),
        country: Joi.string(),
        partnerType: Joi.string(),
        address: Joi.string(),
        tel: Joi.array().items(Joi.string()),
        imgUrl: Joi.string(),
        status: Joi.valid('active', 'inactive'),
        editedBy: Joi.objectId(),
    };
    return Joi.validate(partner, schema);
}

exports.Partner = Partner;
exports.validate = validatePartner;