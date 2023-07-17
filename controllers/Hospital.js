const Hospital = require('../models/Hospital');
const { getHospitalById,departmentNames } = require('../services/hospital');
const logger = require('.././utils/logger');

const gethospital = async (req, res) => {
  try {
    const id = req.params.id;
    const hospital = await getHospitalById(id);
    res.status(200).json({ hospitalData: hospital });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: err });
  }
};
const getdepartments = async (req, res) => {
  try {
    const id = req.params.id;
    const departmentNames = await departmentNames(id);
    res.json({ departments: departmentNames });
  } catch (err) {
    logger.error(err.message);
    res.json({ message: err });
  }
};



module.exports = { gethospital, getdepartments }
