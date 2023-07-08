const router = require('express').Router();
const User = require('../models/Users');
const {getuser} = require('../controllers/getUser')
const {verifyUserAuth} = require('../middleware/userAuth');

router.get("/user/:id",verifyUserAuth,getuser);

module.exports = router;
 
