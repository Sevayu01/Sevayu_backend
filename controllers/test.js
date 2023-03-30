const Hospital = require("../models/Hospital");
const mongoose  = require("mongoose");

const GetController = async (req, res) => {
  const hosid = req.body.hospitalid;
  const find = await Hospital.findOne({ _id: hosid });
  const Hsptls = find.Test;
  res.json(Hsptls);
};
//
const RegController = async (req, res) => {
  try {
    const TestData = req.body.Test;
    // console.log(DoctorData)
    const hosid = req.body.hospitalid;
    // console.log(hosid)
    let find = await Hospital.findOne({ _id: hosid });
console.log(find)
    find.Test = [...find.Test, TestData];
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
    const x = find.Test.filter((data) => {
      return data.id != req.body.Testid;
    }); 
    console.log(x)
    find.Test =x; 
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
    const x = find.Test.map((data) => {
      if (data.id == req.body.Testid) {
        data = {...data, ...req.body}
      }
    });
    await x.save();
    res.json(x)
  } catch (err) {
    console.log(err);
  }
   
};
module.exports = { GetController, RegController, DeleteController, UpdateController };
