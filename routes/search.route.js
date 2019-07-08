const auth = require('../middleware/auth');
const SearchController = require('../controllers/search.controller');
const express = require('express');
const router = express.Router();

router.use(auth);
router.get('/', SearchController.globalSearch);
router.get('/events', SearchController.searchEvent);
router.get('/partners', SearchController.searchPartner);
router.get('/contacts', SearchController.searchContact);
router.get('/user', SearchController.searchUser);

module.exports = router;