const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const S_Key = process.env.SKEY;
const bcrypt = require("bcryptjs");
const RET = process.env.RET;
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, S_Key, { expiresIn: "150" });
};
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.RET, { expiresIn: "150" });
};
const refreshTokens = [];
const varify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, S_Key, (err, user) => {
      if (err) {
        return res.sendStatus(403).json("Error In Varifying Token");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ msg: "You are not authenticated" });
  }
};

const LoginController = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }
    // Check for existing user
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "User Does not exist , Invalid Credentials" });
    // Validate password
    if (user) {
      // varify password with bcrypt
      console.log(user);
      bcrypt.compare(user.password, password, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const accessToken = generateAccessToken(user);
          const refreshToken = jwt.sign({ userId: user._id }, process.env.RET);
          refreshTokens.push(refreshToken);
          res.json({
            username: user.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
          console.log(result); // true
        }
      });
    } else {
      res.status(400).json({ msg: "Invalid credentials" });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "OOPS! There Is Error In Server Side" });
  }
};

const RegController = async (req, res) => {
  try {
    const { username, email, password, confirmpassword, street, city, state } =
      req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "This Email Already Assosiated With A Account" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashPassword,
      street,
      city,
      state,
    });
    await user.save();
    const accessToken = jwt.sign({ userId: user._id }, S_Key, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ userId: user._id }, RET);
    res.cookie("refreshToken", RET, { httpOnly: true });
    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "OOPS! There Is Error In Server Side" });
  }
};

const Refresh = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(401).json({ message: "There Is No Refresh Token" });
    }
    const decoded = jwt.verify(refreshToken, process.env.RET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const LogoutController = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
};
module.exports = {
  LoginController,
  RegController,
  LogoutController,
  varify,
  Refresh,
};
