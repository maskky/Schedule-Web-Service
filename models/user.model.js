const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    tel: String,
    password: String,
    team: String,
    role: {
        type: String,
        enum: ['admin', 'creator', 'viewer']
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, role: this.role}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        username: Joi.string().min(3).required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        team: Joi.string(),
        role: Joi.valid('admin', 'creator', 'viewer')
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;