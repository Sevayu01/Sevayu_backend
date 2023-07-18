const router = require("express").Router();
const {
  getDoctorsByHospitalId,
  registerDoctor,
  deleteDoctor,
  updateDoctor,
} = require("../controllers/doctors");

const verifyAuth = require("../middleware/verifyAuth");
const authenticateHospital = require("../middleware/hospitalAuth");

router.post("/", authenticateHospital, registerDoctor);
router.put("/", authenticateHospital, updateDoctor);
router.delete("/:doctorid", authenticateHospital, deleteDoctor);
router.get("/", verifyAuth, getDoctorsByHospitalId);
router.get("/:hospitalid", verifyAuth, getDoctorsByHospitalId);

module.exports = router;
