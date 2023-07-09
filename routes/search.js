const router = require('express').Router();
const search = require('../controllers/search');

router.get('/:id', search)
module.exports = router;