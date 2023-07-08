const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');
// const Hospital = require('../models/Hospitals');
const {loginUser} = require('../controllers/user_auth');
const {registerUser} = require('../controllers/user_auth');
const {logoutUser} = require('../controllers/user_auth');
const {refreshAccessToken} = require('../controllers/user_auth');
router.post('/register', registerUser); 
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh',refreshAccessToken)
 module.exports = router;
