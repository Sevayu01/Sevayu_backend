const hospitalService = require("../services/hospitalAuth");
const logger = require("../utils/logger");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const result = await hospitalService.login(email, password);

    if (result.error) {
      return res.status(400).json({ msg: result.error });
    }

    const { accessToken, refreshToken, hospitalname } = result;

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

    res.json({ hospitalname, accessToken, refreshToken });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const regController = async (req, res) => {
  try {
    const result = await hospitalService.register(req.body);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }
    if (result.message) {
      res.status(400).json({ message: result.message });
    }
    const { accessToken, refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const refreshController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const result = await hospitalService.refreshAccessToken(refreshToken);
    res.json(result);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const logoutController = (req, res) => {
  hospitalService.logout(req.body.token);
  res.clearCookie("refreshToken", { path: "/refresh-token" });
  res.clearCookie("accessToken", { path: "/" });
  res.sendStatus(204);
};

module.exports = {
  loginController,
  regController,
  refreshController,
  logoutController,
};
