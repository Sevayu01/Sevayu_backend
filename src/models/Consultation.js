const mongoose = require("mongoose");
const consultationSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      required: true,
    },
    prescription: {
      type: String,
    },
    report: {
      type: String,
    },
    payment: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Consultation", consultationSchema);
