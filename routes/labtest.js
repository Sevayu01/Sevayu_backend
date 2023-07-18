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
router.get("/:hospitalId/:testId", verifyAuth, getSingleTest);
router.get("/:hospitalId", verifyAuth, getTests);

module.exports = router;
