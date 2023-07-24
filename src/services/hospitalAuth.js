const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Hospital = require("../models/Hospital");

const generateAccessToken = (hospital) =>
  jwt.sign({ hospitalId: hospital._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

const generateRefreshToken = (hospital) =>
  jwt.sign({ hospitalId: hospital._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

const refreshTokens = [];

const login = async (email, password) => {
  try {
    const hospital = await Hospital.findOne({ email });

    if (!hospital) {
      return { error: "Hospital does not exist, Invalid Credentials" };
    }

    const isMatch = await bcrypt.compare(password, hospital.password);

    if (!isMatch) {
      return { error: "Invalid credentials" };
    }

    const accessToken = generateAccessToken(hospital);
    const refreshToken = generateRefreshToken(hospital);
    refreshTokens.push(refreshToken);

    return { accessToken, refreshToken, hospitalname: hospital.name };
  } catch (error) {
    throw error;
  }
};

const register = async (data) => {
  try {
    const {
      name,
      email,
      password,
      postalcode,
      contact,
      country,
      street,
      city,
      state,
      images,
    } = data;

    const hospital = await Hospital.findOne({ email: email });
    if (hospital) {
      return { message: "This Email is Already Associated with an Account" };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newHospital = new Hospital({
      name,
      email,
      password: hashPassword,
      postalcode,
      contact,
      country,
      street,
      city,
      state,
      images,
    });
    await newHospital.save();

    const accessToken = generateAccessToken(newHospital);
    const refreshToken = generateRefreshToken(newHospital);

    return { accessToken, refreshToken: refreshToken };
  } catch (error) {
    throw error;
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error("There is no refresh token");
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const hospital = await Hospital.findById(decoded.hospitalId);

    if (!hospital) {
      throw new Error("Hospital not found");
    }

    const accessToken = generateAccessToken(hospital);
    return { accessToken };
  } catch (error) {
    throw error;
  }
};

const logout = (token) => {
  refreshTokens.filter((t) => t !== token);
};

module.exports = {
  login,
  register,
  refreshAccessToken,
  logout,
};
