const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const UserController = require('../controllers/user.controller');
const express = require('express');
const router = express.Router();

router.get('/me', auth, UserController.getCurrentUser);
router.get('/', auth, UserController.getAllUsers);
router.get('/:id', auth, UserController.getUserById);
router.post('/create', [auth, admin], UserController.createUser);
router.post('/login', UserController.login);
router.put('/:id', [auth, admin], UserController.updateUser);
router.delete('/:id', [auth, admin], UserController.deleteUser);

module.exports = router;