const Hospital = require("../models/Hospital");
const mongoose = require("mongoose");

const GetController = async (req, res) => {
  const hosid = req.body.hospitalid;
  const find = await Hospital.findOne({ _id: hosid });
  const Hsptls = find.BloodBank;
  res.json(Hsptls);
};
const RegController = async (req, res) => {
  try {
    const BloodBankData = req.body.BloodBank;
    // console.log(DoctorData)
    const hosid = req.body.hospitalid;
    // console.log(hosid)
    let find = await Hospital.findOne({ _id: hosid });
    console.log(find);
    find.BloodBank = [...find.BloodBank, BloodBankData];
    await find.save();
    res.json(find);
  } catch (err) {
    console.log(err);
  }
};
const DeleteController = async (req, res) => {
  try {
    const hosid = req.body.hospitalid;
    let find = await Hospital.findOne({ _id: hosid });
    const x = find.BloodBank.filter((data) => {
      return data.id != req.body.BloodBankid;
    });
    console.log(x);
    find.BloodBank = x;
    await find.save();
    res.json(find);
  } catch (err) {
    console.log(err);
  }
};
const UpdateController = async (req, res) => {
  try {
    const hosid = req.body.hospitalid;
    let find = await Hospital.findOne({ _id: hosid });
    const x = find.BloodBank.map((data) => {
      if (data.id == req.body.BloodBankid) {
        data = { ...data, ...req.body };
      }
    });
    await x.save();
    res.json(x);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  GetController,
  RegController,
  DeleteController,
  UpdateController,
};
