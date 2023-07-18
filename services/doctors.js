const Hospital = require("../models/Hospital");
const {
  setInCache,
  getFromCache,
  deleteFromCache,
} = require(".././utils/cache");

const getDoctorsByHospitalId = async (hospitalId) => {
  try {
    const cacheKey = `${hospitalId}: doctors`;
    const doctorsByid = await getFromCache(cacheKey);
    if (doctorsByid) {
      return doctorsByid;
    }
    const hospital = await Hospital.findOne({ _id: hospitalId });
    const doctors = hospital.doctors;
    await setInCache(cacheKey, doctors);
    return doctors;
  } catch (error) {
    throw new Error("Error in finding doctors");
  }
};

const registerDoctor = async (hospitalId, doctorData) => {
  try {
    const cacheKey = `${hospitalId}: doctors`;
    await deleteFromCache(cacheKey);
    if (!doctorData.id) {
      return "Please provide a valid ID";
    }

    const updatedHospital = await Hospital.findOneAndUpdate(
      { _id: hospitalId, "doctors.id": { $ne: doctorData.id } },
      { $addToSet: { doctors: doctorData } },
      { new: true },
    );

    if (!updatedHospital) {
      return "Please enter a valid hospital ID or the doctor already exists";
    }

    return updatedHospital.doctors;
  } catch (error) {
    throw new Error("Server error");
  }
};

const deleteDoctor = async (hospitalId, doctorId) => {
  try {
    const cacheKey = `${hospitalId}: doctors`;
    await deleteFromCache(cacheKey);
    const updatedHospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      { $pull: { doctors: { _id: doctorId } } },
      { new: true },
    );

    if (!updatedHospital) {
      throw new Error("Hospital not found");
    }

    return "Successfully deleted doctor";
  } catch (error) {
    throw new Error("Server error");
  }
};

const updateDoctor = async (
  hospitalId,
  doctorId,
  name,
  email,
  password,
  contact,
) => {
  try {
    const cacheKey = `${hospitalId}: doctors`;
    await deleteFromCache(cacheKey);
    const updatedHospital = await Hospital.findOneAndUpdate(
      { _id: hospitalId, "doctors._id": doctorId },
      {
        $set: {
          "doctors.$.name": name,
          "doctors.$.email": email,
          "doctors.$.password": password,
          "doctors.$.contact": contact,
        },
      },
      { new: true },
    );

    if (!updatedHospital) {
      throw new Error("Hospital or doctor not found");
    }

    return updatedHospital;
  } catch (error) {
    throw new Error("Server error");
  }
};

module.exports = {
  getDoctorsByHospitalId,
  registerDoctor,
  deleteDoctor,
  updateDoctor,
};
