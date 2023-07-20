const Hospital = require("../../models/Hospital");
const User = require("../../models/Users");
const logger = require("../../utils/logger");
const { HospitalData, userData } = require("../testData");

const end = async () => {
  try {
    await Hospital.deleteOne({ email: HospitalData.email });
    await User.deleteOne({ email: userData.email });
    logger.info("Test data cleanup successful.");
    process.exit(0);
  } catch (err) {
    logger.error("Error cleaning up test data:", err.message);
  }
};

after(async () => {
  await end();
});

module.exports = { end };
