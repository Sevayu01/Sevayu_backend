const router = require("express").Router();
const { NewBloodBank, UpdateController, DeleteController, GetController } = require("../controllers/bloodbank");


const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/", authenticateHospital, NewBloodBank);
router.put("/", authenticateHospital, UpdateController);
router.delete("/:BloodBankid", authenticateHospital, DeleteController);
router.get("/", verifyAuth, GetController);
module.exports = router;