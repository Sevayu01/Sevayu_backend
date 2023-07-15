const Hospital = require('../models/Hospital');
const gethospital = async (req, res) => {
  try {
    const id = req.params.id;
        const hospital = await Hospital.findById(id,{doctors:0,Test:0,BloodBank:0,createdAt:0,updatedAt:0,__v:0,updatedAt:0});
        res.json(hospital);
  } catch (err) {
    res.json({ message: err });
  }
}
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



module.exports = {gethospital, getdepartments}
