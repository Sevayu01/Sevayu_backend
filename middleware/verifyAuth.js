const jwt = require('jsonwebtoken');
const Hospital = require('../models/Hospital');
const User = require('../models/Users');

// varify the person is hospital or user

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const hospital = await Hospital.findById(decoded.hospitalId);
      const user = await User.findById(decoded.userId);

      if ((!hospital) && (!user)) {
        return res.status(404).json({ message: 'Hospital Or User not found' });
      }
      if(user){
        req.userid = user._id;
      }
      else if(hospital){
        req.hospitalid = hospital._id;
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

module.exports = authenticate;
