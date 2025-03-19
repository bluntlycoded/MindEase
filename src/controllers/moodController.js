const { db } = require('../config/firebase');
exports.addOrUpdateMood = async (req, res) => {
  const { mood, details, date, id } = req.body;
  if (!mood) {
    return res.status(400).json({ message: 'Mood is required' });
  }
  try {
    const moodEntry = {
      user: req.user.uid,
      mood,
      details: details || '',
      date: date ? new Date(date) : new Date()
    };
    let docRef;
    if (id) {
      docRef = db.collection('moodEntries').doc(id);
      await docRef.update(moodEntry);
      docRef = { id, ...moodEntry };
    } else {
      const doc = await db.collection('moodEntries').add(moodEntry);
      docRef = { id: doc.id, ...moodEntry };
    }
    res.status(201).json(docRef);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMoods = async (req, res) => {
  try {
    let query = db.collection('moodEntries').where('user', '==', req.user.uid);
    if (req.query.startDate && req.query.endDate) {
      query = query.where('date', '>=', new Date(req.query.startDate))
                   .where('date', '<=', new Date(req.query.endDate));
    }
    const snapshot = await query.orderBy('date', 'desc').get();
    const moods = [];
    snapshot.forEach(doc => moods.push({ id: doc.id, ...doc.data() }));
    res.json(moods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
