const { admin, db } = require('../config/firebase');
exports.getProfile = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.user.uid);
    const profileDoc = await db.collection('profiles').doc(req.user.uid).get();
    const profileData = profileDoc.exists ? profileDoc.data() : {};
    res.json({ uid: userRecord.uid, email: userRecord.email, displayName: userRecord.displayName, ...profileData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const { displayName, photoURL, preferences } = req.body;
    await admin.auth().updateUser(req.user.uid, { displayName, photoURL });
    await db.collection('profiles').doc(req.user.uid).set({ preferences }, { merge: true });
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
