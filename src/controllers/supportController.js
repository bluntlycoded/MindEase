const { db } = require('../config/firebase');
exports.getSupportTickets = async (req, res) => {
  try {
    const snapshot = await db.collection('supportTickets').orderBy('createdAt', 'desc').get();
    const tickets = [];
    snapshot.forEach(doc => tickets.push({ id: doc.id, ...doc.data() }));
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id || !status) {
    return res.status(400).json({ message: 'Ticket ID and status are required' });
  }
  try {
    await db.collection('supportTickets').doc(id).update({ status, updatedAt: new Date() });
    res.json({ message: 'Ticket status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createSupportTicket = async (req, res) => {
  const { subject, description } = req.body;
  if (!subject || !description) {
    return res.status(400).json({ message: 'Subject and description are required' });
  }
  try {
    const ticket = {
      user: req.user.uid,
      subject,
      description,
      status: 'open',
      createdAt: new Date()
    };
    const doc = await db.collection('supportTickets').add(ticket);
    res.status(201).json({ id: doc.id, ...ticket });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
