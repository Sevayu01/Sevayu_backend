const router = require('express').Router();
const {find} = require('../controllers/search');

router.get('/', find)
module.exports = router;