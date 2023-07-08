const router = require("express").Router();
const { NewBloodBank } = require("../controllers/bloodbank");
const { UpdateController } = require("../controllers/bloodbank");
const { DeleteController } = require("../controllers/bloodbank");
const { GetController } = require("../controllers/bloodbank");

const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/",authenticateHospital, NewBloodBank);
router.put("/",authenticateHospital, UpdateController);
router.delete("/:BloodBankid",authenticateHospital, DeleteController);
router.get("/",verifyAuth, GetController);
module.exports = router;