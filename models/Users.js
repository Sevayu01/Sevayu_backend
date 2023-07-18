const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    username: {
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
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    deviceToken: {
      type: String,
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("User", Schema);
