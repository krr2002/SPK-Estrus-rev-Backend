const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

module.exports = (roles = []) => {
  return async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, config.secretOrKey);
      req.user = await User.findById(decoded.id);

      if (!roles.length || roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' });
      }
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
};
