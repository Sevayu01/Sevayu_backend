const { Types } = require("mongoose");
const Hospital = require("../models/Hospital");
const logger = require("../utils/logger");
const {
  setInCache,
  getFromCache,
  deleteFromCache,
} = require(".././utils/cache");

const GetBloodBankData = async (hospitalId) => {
  try {
    const cacheKey = `${hospitalId}: hospitalBloodBank`;
    const hosptl = await getFromCache(cacheKey);
    if (hosptl) {
      return hosptl;
    }
    const HospitalBloodBank = await Hospital.findById(hospitalId, {
      BloodBank: 1,
      _id: 0,
    });
    if (!HospitalBloodBank) {
      logger.error("Blood Bank not found");
      return null;
    }

    await setInCache(cacheKey, HospitalBloodBank);

    return HospitalBloodBank;
  } catch (error) {
    logger.error(error.message);
  }
};

const addBloodBank = async (hospitalId, bloodBankData) => {
  try {
    const cacheKey = `${hospitalId}: hospitalBloodBank`;
    await deleteFromCache(cacheKey);
    const find = await Hospital.findById(hospitalId);
    find.BloodBank = [...find.BloodBank, bloodBankData];
    return await find.save();
  } catch (error) {
    logger.error(error.message);
  }
};

const deleteBloodBank = async (hospitalId, bloodBankId) => {
  try {
    const cacheKey = `${hospitalId}: hospitalBloodBank`;
    await deleteFromCache(cacheKey);
    return await Hospital.findByIdAndUpdate(
      hospitalId,
      { $pull: { BloodBank: { _id: new Types.ObjectId(bloodBankId) } } },
      { new: true },
    );
  } catch (error) {
    logger.error(error.message);
  }
};

const updateBloodBank = async (hospitalId, bloodBankId, updateData) => {
  try {
    const cacheKey = `${hospitalId}: hospitalBloodBank`;
    await deleteFromCache(cacheKey);
    return await Hospital.findOneAndUpdate(
      { _id: hospitalId, "BloodBank._id": bloodBankId },
      { $set: { "BloodBank.$": updateData } },
      { new: true },
    );
  } catch (error) {
    logger.error(error.message);
  }
};

module.exports = {
  GetBloodBankData,
  addBloodBank,
  deleteBloodBank,
  updateBloodBank,
};
