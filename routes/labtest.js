const router = require("express").Router();
const { RegController, GetSingleTestController, UpdateController, DeleteController, GetController } = require("../controllers/labtest");


const authenticateHospital = require("../middleware/hospitalAuth");
const verifyAuth = require("../middleware/verifyAuth");

router.post("/", authenticateHospital, RegController);
router.put("/", authenticateHospital, UpdateController);
router.delete("/:id", authenticateHospital, DeleteController);
router.get("/test/:id", verifyAuth, GetSingleTestController);
router.get("/:hospitalid", verifyAuth, GetController);


module.exports = router;
