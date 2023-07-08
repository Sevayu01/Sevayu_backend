const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {loginController} = require('../controllers/hospital_auth');
const {regController} = require('../controllers/hospital_auth');
const {logoutController} = require('../controllers/hospital_auth');
const {refresh} = require('../controllers/hospital_auth');

router.post('/register', regController); 
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/refresh',refresh)
 module.exports = router;
