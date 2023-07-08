const Hospital = require("../models/Hospital");

const GetController = async (req, res) => {
  try {
    const { hospitalid } = req.params;
    const hospital = await Hospital.findById(hospitalid);
    const testList = hospital.Test;
    res.json({test: testList});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const GetSingleTestController = async (req, res) => {
  try {
    const { hospitalid, testid } = req.params;

    const hospital = await Hospital.findOne(
      { _id: hospitalid },
      { Test: { $elemMatch: { _id: testid } } }
    );

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    const test = hospital.Test[0];
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json({test : test});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


const RegController = async (req, res) => {
  try {
    const { hospitalid, Test } = req.body;

    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalid,
      { $push: { Test } },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json({msg : "Successfully added test"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const DeleteController = async (req, res) => {
  try {
    const { hospitalid} = req.body;
   const Testid = req.params.id;

    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalid,
      { $pull: { Test: { _id: Testid } } },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    res.json({updatedHospital : updatedHospital});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const UpdateController = async (req, res) => {
  try {
    const { hospitalid, Testid, ...updateData } = req.body;

    const updatedHospital = await Hospital.findOneAndUpdate(
      { _id: hospitalid, 'Test._id': Testid },
      { $set: { 'Test.$': {  id:'Test.id',...updateData } } },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ message: 'Hospital or Test not found' });
    }

    res.json({updatedTest : updatedHospital.Test});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { GetController,GetSingleTestController, RegController, DeleteController, UpdateController };
