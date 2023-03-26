const Hospital = require('../models/Hospital');
const gethospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        res.json(hospital);
    } catch (err) {
        res.json({ message: err });
    }
    }
    module.exports = {gethospital}