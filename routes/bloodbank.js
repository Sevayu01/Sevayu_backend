const router = require("express").Router();
const { RegController } = require("../controllers/bloodbank");
const { UpdateController } = require("../controllers/bloodbank");
const { DeleteController } = require("../controllers/bloodbank");
const { GetController } = require("../controllers/bloodbank");

const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/add",authenticateHospital, RegController);
router.put("/update",authenticateHospital, UpdateController);
router.delete("/delete",authenticateHospital, DeleteController);
router.get("/getAll",verifyAuth, GetController);
module.exports = router;