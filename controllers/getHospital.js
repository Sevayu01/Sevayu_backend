const Hospital = require('../models/Hospital');
const gethospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        res.json(hospital);
    } catch (err) {
        res.json({ message: err });
    }
    }
    const getdepartments = async (req, res) => {
        try {
            const hospital = await Hospital.findById(req.params.id);
            let x = []; 
          if(!hospital){
            res.json({ message: "No hospital found" });
          }
            for (let i = 0; i < hospital.doctors.length; i++) {
                x.push(hospital.doctors[i].department);
            }
            res.json({departments: x}  )
        } catch (err) {
            res.json({ message: err });
        }
        }

    module.exports = {gethospital, getdepartments}
