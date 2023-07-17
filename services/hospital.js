const Hospital  = require('../models/Hospital');
const { setInCache, getFromCache } = require('.././utils/cache');
const logger = require('.././utils/logger');

const getHospitalById = async (id) => {
    try {
        const cacheKey = `hospital:${id}`;
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
        console.log(hospital);
        if (!hospital) {
            logger.error('Hospital not found');
        }

        await setInCache(cacheKey, hospital);

        return hospital;
    } catch (err) {
        logger.error(err.message);
    }
};

module.exports = {
    getHospitalById,
};
