const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
// const { check, validationResult } = require('express-validator');
// const auth = require('../middleware/user_auth');
const User = require('../models/Users');
const Hospital = require('../models/Hospital');
const {LoginController} = require('../controllers/hospital_auth');
const {RegController} = require('../controllers/hospital_auth');

router.post('/register', RegController); 
router.post('/login', LoginController);
 module.exports = router;
