const { db } = require('../config/firebase');
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
  try {
    const post = {
      user: req.user.uid,
      title,
      content,
      createdAt: new Date()
    };
    const doc = await db.collection('forumPosts').add(post);
    res.status(201).json({ id: doc.id, ...post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getPosts = async (req, res) => {
  try {
    const snapshot = await db.collection('forumPosts').orderBy('createdAt', 'desc').get();
    const posts = [];
    snapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createComment = async (req, res) => {
  const { postId, comment } = req.body;
  if (!postId || !comment) return res.status(400).json({ message: 'Post ID and comment are required' });
  try {
    const commentData = {
      user: req.user.uid,
      comment,
      createdAt: new Date()
    };
    const doc = await db.collection('forumPosts').doc(postId).collection('comments').add(commentData);
    res.status(201).json({ id: doc.id, ...commentData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
