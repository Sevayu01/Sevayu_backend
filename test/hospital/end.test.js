const Hospital = require("../../models/Hospital");
const { HospitalData } = require("../testData");
const logger = require("../../utils/logger");
const congratulationsIcon = "\u{1F389}";
const checkMark = "\u{2705}";
const partyface = "\u{1F973}";
const end = after((done) => {
  Hospital.deleteOne({ email: HospitalData.email })
    .then(() => {
      logger.info(
        checkMark +
          congratulationsIcon +
          partyface +
          `All tests successfully completed!` +
          congratulationsIcon +
          congratulationsIcon,
      );
      done();
      process.exit(0);
    })
    .catch((err) => {
      logger.error(err.message);
    });
});

module.exports = { end };
