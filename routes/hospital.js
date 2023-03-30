const router = require("express").Router();
const Hospital = require("../models/Hospital");
const { gethospital,getdepartments } = require("../controllers/getHospital");
router.get("/hospital/:id", gethospital);
router.get("/hospital/:id/departments", getdepartments);

module.exports = router;
