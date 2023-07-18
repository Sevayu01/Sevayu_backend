const Hospital = require("../models/Hospital");
const { setInCache, getFromCache } = require(".././utils/cache");
const logger = require(".././utils/logger");

const getHospitalById = async (id) => {
  try {
    const cacheKey = `${id}: hospital`;
    const hosptl = await getFromCache(cacheKey);
    if (hosptl) {
      return hosptl;
    }
    const hospital = await Hospital.findById(id, {
      doctors: 0,
      Test: 0,
      BloodBank: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (!hospital) {
      logger.error("Hospital not found");
    }

    await setInCache(cacheKey, hospital);

    return hospital;
  } catch (err) {
    logger.error(err.message);
  }
};

const departmentNames = async (id) => {
  try {
    const cacheKey = `${id}: departments`;
    const departments = await getFromCache(cacheKey);
    if (departments) {
      return departments;
    }
    const departmentsNames = await Hospital.aggregate([
      { $match: { _id: id } },
      { $unwind: "$doctors" },
      { $group: { _id: "$doctors.department" } },
      { $project: { _id: 0, department: "$_id" } },
    ]);

    if (departmentsNames.length === 0) {
      return { message: "No Departments found" };
    }

    const departmentNamesArray = departmentsNames.map(
      (dept) => dept.department,
    );
    await setInCache(cacheKey, departmentNamesArray);

    return departmentNames;
  } catch (err) {
    logger.error(err.message);
  }
};
module.exports = {
  getHospitalById,
  departmentNames,
};
