const {
  GetBloodBankData,
  addBloodBank,
  deleteBloodBank,
  updateBloodBank,
} = require("../services/bloodbank");
const logger = require("../utils/logger");

const getController = async (req, res) => {
  try {
    const hospitalId = req.params.hospitalid;
    const findBloodBankData = await GetBloodBankData(hospitalId);
    res.json({ BloodBank: findBloodBankData.BloodBank });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const newBloodBank = async (req, res) => {
  try {
    const bloodBankData = req.body.BloodBank;
    const hospitalId = req.body.hospitalid;
    await addBloodBank(hospitalId, bloodBankData);
    res.json({ msg: "Successfully added BloodBank" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteController = async (req, res) => {
  try {
    const { hospitalid } = req.body;
    const bloodBankid = req.params.BloodBankid;
    const result = await deleteBloodBank(hospitalid, bloodBankid);
    if (result === null) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.json({ message: "Successfully deleted bloodBank" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateController = async (req, res) => {
  try {
    const { hospitalid, BloodBankid, ...updateData } = req.body;
    const result = await updateBloodBank(hospitalid, BloodBankid, updateData);
    if (result === null) {
      return res
        .status(404)
        .json({ message: "Hospital or BloodBank not found" });
    }
    res.json({ BloodBank: result.BloodBank });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getController,
  newBloodBank,
  deleteController,
  updateController,
};
