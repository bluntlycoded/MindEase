const express = require('express');
const router = express.Router();
const { getSupportTickets, updateTicketStatus, createSupportTicket } = require('../controllers/supportController');
const { protect } = require('../middleware/authMiddleware');
const { supportOnly } = require('../middleware/roleMiddleware');
router.get('/tickets', protect, supportOnly, getSupportTickets);
router.put('/ticket/:id', protect, supportOnly, updateTicketStatus);
router.post('/ticket', protect, createSupportTicket);
module.exports = router;
