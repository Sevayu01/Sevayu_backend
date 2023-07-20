const hospitalService = require("../services/doctors");
const logger = require("../utils/logger");

const getDoctorsByHospitalId = async (req, res) => {
  try {
    const hospitalId = req.params.hospitalid;
    const doctors = await hospitalService.getDoctorsByHospitalId(hospitalId);
    res.json({ doctors: doctors });
  } catch (error) {
    res.json("Error in finding doctors");
    logger.log(error.message);
  }
};

const registerDoctor = async (req, res) => {
  try {
    const { Doctor: doctorData, hospitalid } = req.body;
    const doctors = await hospitalService.registerDoctor(
      hospitalid,
      doctorData,
    );
    res.json({ doctors });
  } catch (error) {
    logger.error(error).message;
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const { hospitalid } = req.body;
    const doctorid = req.params.doctorid;
    const message = await hospitalService.deleteDoctor(hospitalid, doctorid);
    res.json({ msg: message });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const {
      doctorid,
      hospitalid,
      name,
      experience,
      speciality,
      contact,
      department,
      Intime,
      Outtime,
      days,
    } = req.body;
    const updatedHospital = await hospitalService.updateDoctor({
      doctorid,
      hospitalid,
      name,
      experience,
      speciality,
      contact,
      department,
      Intime,
      Outtime,
      days,
    });

    res.json(updatedHospital);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error", error: error });
  }
};

module.exports = {
  getDoctorsByHospitalId,
  registerDoctor,
  deleteDoctor,
  updateDoctor,
};
