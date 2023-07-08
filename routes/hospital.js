const router = require("express").Router();
const Hospital = require("../models/Hospital");
const { gethospital,getdepartments } = require("../controllers/Hospital");

const verifyAuth = require("../middleware/verifyAuth");

router.get("/:id",verifyAuth, gethospital);
router.get("/:id/departments",verifyAuth, getdepartments);

module.exports = router;
