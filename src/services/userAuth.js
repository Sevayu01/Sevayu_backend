const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateAccessToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

const generateRefreshToken = (user) =>
  jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

const registerUser = async ({
  username,
  email,
  password,
  confirmPassword,
  street,
  city,
  state,
  deviceToken,
}) => {
  if (password !== confirmPassword) {
    throw new Error("Password and Confirm Password do not match");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("This email is already associated with an account");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword,
    street,
    city,
    state,
    deviceToken,
  });

  await user.save();
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

const refreshAccessToken = async (refreshtkn) =>
  new Promise((resolve, reject) => {
    jwt.verify(refreshtkn, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return reject(new Error("Forbidden"));
      }
      const refreshToken = generateRefreshToken(user);
      const accessToken = generateAccessToken(user);
      resolve({ accessToken, refreshToken });
    });
  });

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
};
