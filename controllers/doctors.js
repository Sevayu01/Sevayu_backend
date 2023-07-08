const Hospital = require("../models/Hospital");
const mongoose  = require("mongoose");

const GetController = async (req, res) => {
  try{
  const hosid = req.params.hospitalid;
  const find = await Hospital.findOne({ _id: hosid });
  const doctors = find.doctors;
  res.json({doctors : doctors});}
  catch(err){
    res.json("error in finding doctors");
    console.log(err)}
};
const RegController = async (req, res) => {
  try {
    const { Doctor: DoctorData, hospitalid } = req.body;

    if (!DoctorData.id) {
      return res.json("Please provide a valid ID");
    }

    const find = await Hospital.findOneAndUpdate(
      { _id: hospitalid, "doctors.id": { $ne: DoctorData.id } },
      { $addToSet: { doctors: DoctorData } },
      { new: true }
    );

    if (!find) {
      return res.json("Please enter a valid hospital ID or the doctor already exists");
    }

    res.json({ doctors: find.doctors });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const DeleteController = async (req, res) => {
  try {
    const { hospitalid } = req.body;
    const doctorid = req.params.doctorid;

    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalid,
      { $pull: { doctors: { _id: doctorid } } },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json({msg:"Successfully deleted doctor"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const UpdateController = async (req, res) => {
  try {
    const { hospitalid, doctorid, name, email, password, contact } = req.body;

    const updatedHospital = await Hospital.findOneAndUpdate(
      { _id: hospitalid, 'doctors._id': doctorid },
      { $set: { 'doctors.$.name': name, 'doctors.$.email': email, 'doctors.$.password': password, 'doctors.$.contact': contact } },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital or doctor not found' });
    }

    res.json(updatedHospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { GetController, RegController, DeleteController, UpdateController };
