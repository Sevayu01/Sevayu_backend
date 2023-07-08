const mongoose = require("mongoose");
const { DoctorSchema } = require("./Doctor");
const { LabtestSchama } = require("./LabTest");
const { BloodBankSchema } = require("./BloodBank");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    postalcode: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    images: {
      type: [{ id: { type: String }, url: { type: String } }],
      required: true,
    },

    doctors: {
      type: [DoctorSchema],
    },
    Test: {
      type: [LabtestSchama],
    },
    BloodBank: { type: [BloodBankSchema] },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Hospital", Schema);
