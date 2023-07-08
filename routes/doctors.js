const router = require("express").Router();
const { RegController } = require("../controllers/doctors");
const { UpdateController } = require("../controllers/doctors");
const { DeleteController } = require("../controllers/doctors");
const { GetController } = require("../controllers/doctors");

const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/",authenticateHospital, RegController);
router.put("/",authenticateHospital, UpdateController);
router.delete("/:doctorid",authenticateHospital, DeleteController);
router.get("/",verifyAuth, GetController);
router.get("/:hospitalid",verifyAuth, GetController);

module.exports = router;
