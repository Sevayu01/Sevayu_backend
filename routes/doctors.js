const router = require("express").Router();
const { RegController, UpdateController, DeleteController, GetController } = require("../controllers/doctors");


const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/", authenticateHospital, RegController);
router.put("/", authenticateHospital, UpdateController);
router.delete("/:doctorid", authenticateHospital, DeleteController);
router.get("/", verifyAuth, GetController);
router.get("/:hospitalid", verifyAuth, GetController);

module.exports = router;
