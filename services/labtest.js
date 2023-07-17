const Hospital = require("../models/Hospital");

const getHospitalLabTest = async (hospitalId) => {
    const cacheKey = `${hospitalId}: labtest`;
    const labtest = await getFromCache(cacheKey);
    if (labtest) {
        return labtest;
    }
    const hospitalLabTest = await Hospital.findById(hospitalId, {
        Test: 1,
        _id: 0,
    });
    if (!hospitalLabTest) {
        logger.error("Lab Test not found");
        return null;
    }

    await setInCache(cacheKey, hospitalLabTest);

    return hospitalLabTest;
};


const addTestToHospital = async (hospitalId, test) => {
    const cacheKey = `${hospitalId}: labtest`;
    await deleteFromCache(cacheKey);
    return await Hospital.findByIdAndUpdate(
        hospitalId,
        { $push: { Test: test } },
        { new: true }
    );
};

const removeTestFromHospital = async (hospitalId, testId) => {
    const cacheKey = `${hospitalId}: labtest`;  
    await deleteFromCache(cacheKey);
    return await Hospital.findByIdAndUpdate(
        hospitalId,
        { $pull: { Test: { _id: testId } } },
        { new: true }
    );
};

const updateTestInHospital = async (hospitalId, testId, updateData) => {
    const cacheKey = `${hospitalId}: labtest`;
    await deleteFromCache(cacheKey);
    return await Hospital.findOneAndUpdate(
        { _id: hospitalId, 'Test._id': testId },
        { $set: { 'Test.$': { id: 'Test.id', ...updateData } } },
        { new: true }
    );
};

module.exports = {
    getHospitalLabTest,
    addTestToHospital,
    removeTestFromHospital,
    updateTestInHospital,
};
