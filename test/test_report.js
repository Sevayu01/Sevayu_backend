const logger = require("./src/utils/logger");
const congratulationsIcon = "\u{1F389}";
const checkMark = "\u{2705}";
const partyface = "\u{1F973}";
const report = () => {
  logger.info(
    checkMark +
      congratulationsIcon +
      partyface +
      `All tests successfully completed!` +
      congratulationsIcon +
      congratulationsIcon,
  );
  process.exit(0);
};
report();
module.exports = { report };
