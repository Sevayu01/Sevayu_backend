const Hospital = require('../models/Hospital');
const { getHospitalById } = require('../services/hospital');
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
    const departments = await Hospital.aggregate([
      { $match: { _id: req.params.id } },
      { $unwind: '$doctors' },
      { $group: { _id: '$doctors.department' } },
      { $project: { _id: 0, department: '$_id' } }
    ]);

    if (departments.length === 0) {
      return res.json({ message: 'No Departments found' });
    }

    const departmentNames = departments.map((dept) => dept.department);
    res.json({ departments: departmentNames });
  } catch (err) {
    res.json({ message: err });
  }
};



module.exports = { gethospital, getdepartments }
