const express = require('express');
const router = express.Router();
const { getNotifications, updateNotificationSettings, logNotification } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');
router.get('/', protect, getNotifications);
router.put('/settings', protect, updateNotificationSettings);
router.post('/log', protect, logNotification);
module.exports = router;
