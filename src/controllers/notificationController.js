const { db } = require('../config/firebase');
exports.getNotifications = async (req, res) => {
  try {
    const snapshot = await db.collection('notifications').where('user', '==', req.user.uid).orderBy('date', 'desc').get();
    const notifications = [];
    snapshot.forEach(doc => notifications.push({ id: doc.id, ...doc.data() }));
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateNotificationSettings = async (req, res) => {
  const { settings } = req.body;
  if (!settings) return res.status(400).json({ message: 'Notification settings are required' });
  try {
    await db.collection('notificationSettings').doc(req.user.uid).set({ settings }, { merge: true });
    res.json({ message: 'Notification settings updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.logNotification = async (req, res) => {
  const { type, message } = req.body;
  if (!type || !message) return res.status(400).json({ message: 'Notification type and message are required' });
  try {
    const notification = {
      user: req.user.uid,
      type,
      message,
      date: new Date()
    };
    const doc = await db.collection('notifications').add(notification);
    res.status(201).json({ id: doc.id, ...notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
