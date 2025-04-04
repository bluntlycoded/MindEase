const express = require('express');
const router = express.Router();
const { addContent, updateContent, deleteContent, moderateContent } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly, moderatorOnly } = require('../middleware/roleMiddleware');

router.post('/content', protect, adminOnly, addContent);
router.put('/content/:id', protect, adminOnly, updateContent);
router.delete('/content/:id', protect, adminOnly, deleteContent);
router.post('/moderate', protect, moderatorOnly, moderateContent);

module.exports = router;
