const router = require("express").Router();
const { RegController } = require("../controllers/doctors");
const { UpdateController } = require("../controllers/doctors");
const { DeleteController } = require("../controllers/doctors");
const { GetController } = require("../controllers/doctors");

const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/add",authenticateHospital, RegController);
router.put("/update",authenticateHospital, UpdateController);
router.delete("/delete",authenticateHospital, DeleteController);
router.get("/getAll/:hospitalid",verifyAuth, GetController);
module.exports = router;
