const Hospital = require("../models/Hospital");
const logger = require("../utils/logger");

const find = async (req, res) => {
  const searchText = req.query.text;

  const regexPattern = new RegExp(searchText, "i");

  try {
    const hospitals = await Promise.all([
      Hospital.find({ name: { $regex: regexPattern } }).lean(),
      Hospital.find({ postalcode: { $regex: regexPattern } }).lean(),
      Hospital.find({ city: { $regex: regexPattern } }).lean(),
      Hospital.find({ state: { $regex: regexPattern } }).lean(),
    ]);

    const mergedHospitals = [].concat(...hospitals);

    return res.status(200).json({ hospitals: mergedHospitals });
  } catch (err) {
    logger.error("Error occurred while searching hospitals:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { find };
