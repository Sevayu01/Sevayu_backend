const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../utils/logger");
const generateAccessToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, street, city, state } =
      req.body;

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password and Confirm Password do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This email is already associated with an account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      street,
      city,
      state,
    });

    await user.save();

    res.json({ message: "Successfully created account" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token: accessToken,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshtkn = req.cookies.refreshToken;

    if (!refreshtkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(refreshtkn, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const refreshToken = generateRefreshToken(user);

      const accessToken = generateAccessToken(user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/refresh-token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        path: "/",
        maxAge: 15 * 60 * 1000,
      });

      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", { path: "/refresh-token" });
  res.clearCookie("accessToken", { path: "/" });
  res.sendStatus(204);
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
