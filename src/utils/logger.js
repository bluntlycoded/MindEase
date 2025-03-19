const morgan = require('morgan');
morgan.token('user', (req) => (req.user ? req.user.uid : 'Guest'));
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :user');
module.exports = logger;
