const Hospital = require('../models/Hospital');
const jwt = require('jsonwebtoken');

const gethospital = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const hospitalId = decodedToken.hospitalId;
    const hospital = await Hospital.findById(hospitalId, {
      doctors: 0,
      Test: 0,
      BloodBank: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(hospital);
  } catch (err) {
    res.json({ message: err });
  }
};

    const getdepartments = async (req, res) => {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          const hospitalId = decodedToken.hospitalId;
          const departments = await Hospital.aggregate([
            { $match: { _id: hospitalId} },
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
      
      

    module.exports = {gethospital, getdepartments}
