const express = require('express');
const router = express.Router();
const { addOrUpdateMood, getMoods } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, addOrUpdateMood);
router.get('/', protect, getMoods);
module.exports = router;
