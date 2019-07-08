const auth = require('../middleware/auth');
const perm = require('../middleware/perm');
const NotificationController = require('../controllers/notification.controller');
const express = require('express');
const router = express.Router();

router.use(auth);
router.get('/:id', NotificationController.getNotificationByUserId);
router.post('/', perm, NotificationController.sendNotification);
router.put('/:id', perm, NotificationController.setNotificationToSeen);

module.exports = router;