const jwt = require('jsonwebtoken');
const User = require('../models/Users');

const verifyUserAuth = async(req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userId = decoded.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'Please login first' });
    }
    next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

 

module.exports = { verifyUserAuth };
