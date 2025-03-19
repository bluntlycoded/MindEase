const { db } = require('../config/firebase');

exports.addContent = async (req, res) => {
  const { type, title, description, mediaUrl } = req.body;
  if (!type || !title) {
    return res.status(400).json({ message: 'Content type and title are required' });
  }
  try {
    const content = {
      type,
      title,
      description: description || '',
      mediaUrl: mediaUrl || '',
      createdAt: new Date()
    };
    const doc = await db.collection('content').add(content);
    return res.status(201).json({ id: doc.id, ...content });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateContent = async (req, res) => {
  const { id } = req.params;
  const { type, title, description, mediaUrl } = req.body;
  if (!id) {
    return res.status(400).json({ message: 'Content ID is required' });
  }
  try {
    const updatedContent = {
      ...(type && { type }),
      ...(title && { title }),
      ...(description && { description }),
      ...(mediaUrl && { mediaUrl }),
      updatedAt: new Date()
    };
    await db.collection('content').doc(id).update(updatedContent);
    return res.json({ id, ...updatedContent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteContent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Content ID is required' });
  }
  try {
    await db.collection('content').doc(id).delete();
    return res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.moderateContent = async (req, res) => {
  const { id, approved } = req.body;
  if (!id || approved === undefined) {
    return res.status(400).json({ message: 'Content ID and approval status are required' });
  }
  try {
    await db.collection('content').doc(id).update({ approved, moderatedAt: new Date() });
    return res.json({ message: 'Content moderated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
