const express = require('express'); 
const router = express.Router();

const User = require('../models/Users');
const {loginUser} = require('../controllers/userAuth');
const {registerUser} = require('../controllers/userAuth');
const {logoutUser} = require('../controllers/userAuth');
const {refreshAccessToken} = require('../controllers/userAuth');
router.post('/register', registerUser); 
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh',refreshAccessToken)
 module.exports = router;
