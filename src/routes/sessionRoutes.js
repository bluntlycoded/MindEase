const express = require('express');
const router = express.Router();
const { getSessions, updateSessionStatus } = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');
router.get('/', protect, getSessions);
router.post('/status', protect, updateSessionStatus);
module.exports = router;
