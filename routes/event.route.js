const auth = require('../middleware/auth');
const perm = require('../middleware/perm');
const EventController = require('../controllers/event.controller');
const express = require('express');
const router = express.Router();

router.use(auth);
router.get('/?', EventController.getAllEvents);
router.get('/:id', EventController.getEventById);
router.post('/', perm, EventController.createEvent);
router.put('/:id', perm, EventController.updateEvent);
router.delete('/:id', perm, EventController.deleteEvent);

module.exports = router;