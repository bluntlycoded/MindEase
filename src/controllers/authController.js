const { admin } = require('../config/firebase');
const axios = require('axios');
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name
    });
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.status(201).json({
      uid: userRecord.uid,
      name: userRecord.displayName,
      email: userRecord.email,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const apiKey = process.env.FIREBASE_API_KEY;
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      { email, password, returnSecureToken: true }
    );
    res.json({
      uid: response.data.localId,
      name: response.data.displayName,
      email: response.data.email,
      token: response.data.idToken
    });
  } catch (error) {
    const errMsg = error.response && error.response.data && error.response.data.error ? error.response.data.error.message : error.message;
    res.status(401).json({ message: errMsg });
  }
};
