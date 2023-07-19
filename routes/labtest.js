const router = require("express").Router();
const {
  getTests,
  getSingleTest,
  registerTest,
  deleteTest,
  updateTest,
} = require("../controllers/labtest");

const authenticateHospital = require("../middleware/hospitalAuth");
const verifyAuth = require("../middleware/verifyAuth");

router.post("/", authenticateHospital, registerTest);
router.put("/", authenticateHospital, updateTest);
router.delete("/:id", authenticateHospital, deleteTest);
router.get("/:hospitalId", verifyAuth, getTests);
router.get("/:hospitalId/:testId", verifyAuth, getSingleTest);

module.exports = router;
