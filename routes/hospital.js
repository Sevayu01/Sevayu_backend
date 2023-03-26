const router = require('express').Router();
const Hospital = require('../models/Hospital');
const {gethospital} = require('../controllers/getHospital')
router.get("/hospital/:id", gethospital
);
 
module.exports = router;