const auth = require('../middleware/auth');
const perm = require('../middleware/perm');
const ContactController = require('../controllers/contact.controller');
const express = require('express');
const router = express.Router();

router.use(auth);
router.get('/', ContactController.getAllContacts);
router.get('/:id', ContactController.getContactById);
router.post('/', perm, ContactController.createContact);
router.put('/:id', perm, ContactController.updateContact);
router.delete('/:id', perm, ContactController.deleteContact);

module.exports = router;