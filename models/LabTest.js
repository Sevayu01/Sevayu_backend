const mongoose = require("mongoose");
const LabtestSchama = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  }
  );
  module.exports = mongoose.model("LabtestSchama", LabtestSchama);