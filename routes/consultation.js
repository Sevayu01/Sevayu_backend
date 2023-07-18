const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultationController");

router.post("/", consultationController.scheduleConsultation);
router.put(
  "/:consultationId/status",
  consultationController.updateConsultationStatus,
);

module.exports = router;
