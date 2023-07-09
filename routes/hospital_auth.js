const express = require('express'); 
const router = express.Router();

const {loginController} = require('../controllers/hospitalAuth');
const {regController} = require('../controllers/hospitalAuth');
const {logoutController} = require('../controllers/hospitalAuth');
const {refresh} = require('../controllers/hospitalAuth');

router.post('/register', regController); 
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/refresh',refresh)
 module.exports = router;
