const router = require('express').Router();
const User = require('../models/Users');
const {getuser} = require('../controllers/getUser')
router.get("/user/:id",getuser);

module.exports = router;
 
