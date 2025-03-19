const { db } = require('../config/firebase');
exports.getSessions = async (req, res) => {
  try {
    const snapshot = await db.collection('sessions').orderBy('order', 'asc').get();
    const sessions = [];
    snapshot.forEach(doc => sessions.push({ id: doc.id, ...doc.data() }));
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateSessionStatus = async (req, res) => {
  const { sessionId, completed, favorite } = req.body;
  if (!sessionId) return res.status(400).json({ message: 'Session ID is required' });
  try {
    const userSessionRef = db.collection('userSessions').doc(req.user.uid);
    await userSessionRef.set({ [sessionId]: { completed: !!completed, favorite: !!favorite } }, { merge: true });
    res.json({ message: 'Session status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
