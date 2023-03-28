const Hospital = require("../models/Hospital");
const mongoose  = require("mongoose");

const GetController = async (req, res) => {
  try{
  const hosid = req.body.hospitalid;
  const find = await Hospital.findOne({ _id: hosid });
  const Hsptls = find.doctors;
  res.json(Hsptls);}
  catch(err){
    res.json("error in finding doctors");
    console.log(err)}
};
const RegController = async (req, res) => {
  try {
    const DoctorData = req.body.Doctor;
    // console.log(DoctorData)

    if (
      DoctorData.id == null ||
      DoctorData.id == undefined ||
      DoctorData.id == "" ||
      DoctorData.id == " "
    ) {
      return res.json("type a valid id");
    }
    const hosid = req.body.hospitalid;
    // console.log(hosid)
    let find = await Hospital.findOne({ _id: hosid });
    // console.log(find);
    if(!find){
     return res.json("please enter a valid hospital id")
    }
    const x = find.doctors.filter((data) => {
      return data.id == DoctorData.id;
    });
    if (x.length > 0) {
      return res.json("id already exist");
    }

    find.doctors = [...find.doctors, DoctorData];
    await find.save();
    res.json(find);
    // const csrfToken = req.csrfToken();
  } catch (err) {
    // res.json("error")
    // res.jon
    console.log(err);
  }
};
const DeleteController = async (req, res) => {
  try {
    const hosid = req.body.hospitalid;
    let find = await Hospital.findOne({ _id: hosid });
    const x = find.doctors.filter((data) => {
      return data.id != req.body.doctorid;
    }); 
    console.log(x)
    find.doctors =x; 
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
    const x = find.doctors.map((data) => {
      if (data.id == req.body.doctorid) {
        data.name = req.body.name;
        data.email = req.body.email;
        data.password = req.body.password;
        data.contact = req.body.contact;
      }
    });
    await x.save();
  } catch (err) {
    console.log(err);
  }
  // res.json(ListItem);
};
module.exports = { GetController, RegController, DeleteController, UpdateController };
