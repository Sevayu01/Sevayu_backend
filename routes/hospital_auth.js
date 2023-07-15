const express = require('express'); 
const router = express.Router();

const {logoutController,refresh,regController,loginController} = require('../controllers/hospitalAuth');
const {BasicAuth} = require('../middleware/signupBasicAuth')

router.post('/register', BasicAuth, regController); 
router.post('/login', loginController);
router.post('/logout', logoutController);
router.post('/refresh',refresh)
 module.exports = router;
