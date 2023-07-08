const { Types } = require('mongoose');
const Hospital = require("../models/Hospital");
const mongoose = require("mongoose");

const GetController = async (req, res) => {
  const hosid = req.body.hospitalid;
  const find = await Hospital.findById(hosid, { BloodBank: 1, _id: 0 });
  res.json(find);
};

const NewBloodBank = async (req, res) => {
  try {
    const BloodBankData = req.body.BloodBank;
 
    const hosid = req.body.hospitalid;
 
    let find = await Hospital.findById(hosid);
    find.BloodBank = [...find.BloodBank, BloodBankData];
    await find.save();
    res.json({msg:"Successfull added BloodBank"});
  } catch (err) {
    console.log(err);
  }
};

const DeleteController = async (req, res) => {
  try {
    const { hospitalid, BloodBankid } = req.body;
    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalid,
      { $pull: { BloodBank: { _id: new Types.ObjectId(BloodBankid) } } },
      { new: true }
    );
    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    res.json(updatedHospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
const UpdateController = async (req, res) => {
  try {
    const { hospitalid, BloodBankid, ...updateData } = req.body;

    const updatedHospital = await Hospital.findOneAndUpdate(
      { _id: hospitalid, 'BloodBank._id': BloodBankid },
      { $set: { 'BloodBank.$': updateData } },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital or BloodBank not found' });
    }

    res.json(updatedHospital);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  GetController,
  NewBloodBank,
  DeleteController,
  UpdateController,
};
