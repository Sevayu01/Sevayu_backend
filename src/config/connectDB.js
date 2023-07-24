const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDB = async () => {
  await mongoose.connect(process.env.uri);
  logger.info("MongoDB connected");
};

module.exports = connectDB;
