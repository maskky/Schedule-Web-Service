const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User, validate, UserSchema} = require('../models/user.model');

exports.getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
};

exports.getAllUsers = async (req, res) => {
    const {role} = req.query;
    let query = {};
    if (role) query.role = role;
    const users = await User.find(query).sort('name');
    res.send(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404),send('User not found.');
    res.send(user);
};

exports.createUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.find({username : req.body.username});
    if (user.length) return res.status(400).send('Username "' + req.body.username + '" is alreay exists.');

    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user = await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'username', 'name', 'email', 'tel', 'team', 'role']));
};

exports.updateUser = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!user) return res.status(404).send('User not found.');
    res.send(user);
};

exports.deleteUser = async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if (!user) return res.status(404).send('User not found.');
    res.send(user);
};

exports.login = async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({username : req.body.username});
    if (!user) return res.status(400).send('Invalid username or password');

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) res.status(400).send('Invalid username or password');

    const token = user.generateAuthToken();

    res.send(token);
};
