const HospitalService = require("../services/labtest");
const logger = require("../utils/logger");
const getTests = async (req, res) => {
  try {
    const { hospitalId } = req.params;
    const hospital = await HospitalService.getHospitalLabTest(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const testList = hospital;
    res.json({ test: testList });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getSingleTest = async (req, res) => {
  try {
    const { hospitalId, testId } = req.params;

    const hospital = await HospitalService.getHospital(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const test = hospital.Test.find((t) => t._id.toString() === testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.json({ test: test });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const registerTest = async (req, res) => {
  try {
    const { hospitalId, Test } = req.body;

    const updatedHospital = await HospitalService.addTestToHospital(
      hospitalId,
      Test,
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json({ test: updatedHospital.Test });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTest = async (req, res) => {
  try {
    const { hospitalId } = req.body;
    const testId = req.params.id;

    const updatedHospital = await HospitalService.removeTestFromHospital(
      hospitalId,
      testId,
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.json({ message: "LabTest has been removed" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTest = async (req, res) => {
  try {
    const { hospitalId, testId, ...updateData } = req.body;

    const updatedHospital = await HospitalService.updateTestInHospital(
      hospitalId,
      testId,
      updateData,
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: "Hospital or Test not found" });
    }

    res.json({ updatedTest: updatedHospital.Test });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getTests,
  getSingleTest,
  registerTest,
  deleteTest,
  updateTest,
};
