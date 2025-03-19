const express = require('express');
const router = express.Router();
const { createPost, getPosts, createComment } = require('../controllers/forumController');
const { protect } = require('../middleware/authMiddleware');
router.post('/post', protect, createPost);
router.get('/posts', getPosts);
router.post('/comment', protect, createComment);
module.exports = router;
