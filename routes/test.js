const router = require("express").Router();
const { RegController } = require("../controllers/test");
const { UpdateController } = require("../controllers/test");
const { DeleteController } = require("../controllers/test");
const { GetController } = require("../controllers/test");

const authenticateHospital = require("../middleware/hospitalAuth");
const verifyAuth = require("../middleware/verifyAuth");

router.post("/register",authenticateHospital, RegController);
router.put("/update",authenticateHospital, UpdateController);
router.delete("/delete",authenticateHospital, DeleteController);
router.get("/getAll/:hospitalid",verifyAuth, GetController);

module.exports = router;
