const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Hospital = require("../models/Hospital");
// const client = require("../config/search");
const logger = require("../utils/logger");

const generateAccessToken = (hospital) =>
  jwt.sign({ hospitalId: hospital._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

const generateRefreshToken = (hospital) =>
  jwt.sign({ hospitalId: hospital._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

const refreshTokens = [];

const varify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, hospital) => {
      if (err) {
        return res.sendStatus(403).json("Error in Verifying Token");
      }

      req.hospital = hospital;
      next();
    });
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const hospital = await Hospital.findOne({ email });

    if (!hospital) {
      return res
        .status(400)
        .json({ msg: "Hospital does not exist, Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, hospital.password);

    if (isMatch) {
      const accessToken = generateAccessToken(hospital);
      const refreshToken = generateRefreshToken(hospital);
      refreshTokens.push(refreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/refresh-token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        hospitalname: hospital.name,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    logger.error(error).message;
    res.status(500).json({ message: "Server error" });
  }
};

const regController = async (req, res) => {
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
    } = req.body;

    const hospital = await Hospital.findOne({ email: email });
    if (hospital) {
      return res
        .status(400)
        .json({ message: "This Email is Already Associated with an Account" });
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

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: "There is no refresh token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const hospital = await Hospital.findById(decoded.hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const accessToken = generateAccessToken(hospital);

    return res.json({ accessToken });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutController = (req, res) => {
  refreshTokens.filter((token) => token !== req.body.token);
  res.clearCookie("refreshToken", { path: "/refresh-token" });
  res.clearCookie("accessToken", { path: "/" });
  res.sendStatus(204);
};

module.exports = {
  loginController,
  regController,
  logoutController,
  varify,
  refresh,
};
