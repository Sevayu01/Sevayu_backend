const mongoose = require("mongoose");
const BloodBankSchema = new mongoose.Schema({
    type: [
      {
        Type: { type: String },
        available: { type: Boolean },
        contact: { type: String },
      },
    ],
  }
  );
  module.exports = mongoose.model("BloodBankSchema", BloodBankSchema);