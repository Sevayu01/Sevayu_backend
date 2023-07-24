const router = require("express").Router();
const {
  getController,
  newBloodBank,
  deleteController,
  updateController,
} = require("../controllers/bloodbank");

const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/", authenticateHospital, newBloodBank);
router.put("/", authenticateHospital, updateController);
router.delete("/:BloodBankid", authenticateHospital, deleteController);
router.get("/:hospitalid", verifyAuth, getController);
module.exports = router;
