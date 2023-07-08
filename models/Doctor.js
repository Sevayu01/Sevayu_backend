const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
    },
    contact: {
      type: String,
    },
    department: {
      type: String,
      required: true,
    },
    Intime: {
      type: String,
      required: true,
    },
    Outtime: {
      type: String,
      required: true,
    },
    days: {
      type: [String],
      required: true
    },
  }); 
  module.exports = mongoose.model("DoctorSchema", DoctorSchema);