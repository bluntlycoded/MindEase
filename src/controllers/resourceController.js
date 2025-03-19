const { db } = require('../config/firebase');
exports.getResources = async (req, res) => {
  try {
    let query = db.collection('resources');
    if (req.query.category) {
      query = query.where('category', '==', req.query.category);
    }
    const snapshot = await query.orderBy('title').get();
    const resources = [];
    snapshot.forEach(doc => resources.push({ id: doc.id, ...doc.data() }));
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
