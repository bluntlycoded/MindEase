const roleMiddleware = {};
roleMiddleware.adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access required.' });
  }
};
roleMiddleware.moderatorOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'moderator')) {
    next();
  } else {
    return res.status(403).json({ message: 'Moderator access required.' });
  }
};
roleMiddleware.supportOnly = (req, res, next) => {
  if (req.user && req.user.role === 'support') {
    next();
  } else {
    return res.status(403).json({ message: 'Support access required.' });
  }
};
module.exports = roleMiddleware;
