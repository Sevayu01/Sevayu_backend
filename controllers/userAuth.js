const authService = require("../services/userAuth");
const logger = require("../utils/logger");

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      street,
      city,
      state,
      deviceToken,
    } = req.body;

    await authService.registerUser({
      username,
      email,
      password,
      confirmPassword,
      street,
      city,
      state,
      deviceToken,
    });

    res.json({ message: "Successfully created account" });
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, accessToken, refreshToken } = await authService.loginUser({
      email,
      password,
    });

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
    logger.error(error.message);
    res.status(400).json({ message: error.message });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshtkn = req.cookies.refreshToken;

    if (!refreshtkn) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { accessToken } = await authService.refreshAccessToken(refreshtkn);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    logger.error(error.message);
    res.status(403).json({ message: error.message });
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
