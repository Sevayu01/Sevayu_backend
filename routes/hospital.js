const router = require("express").Router();
const Hospital = require("../models/Hospital");
const authenticateHospital = require("../middleware/authenticateHospital");
const { gethospital,getdepartments } = require("../controllers/Hospital");
router.get("/",authenticateHospital, gethospital);
router.get("/departments",authenticateHospital, getdepartments);

module.exports = router;
