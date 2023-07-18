const jwt = require("jsonwebtoken");
const Hospital = require("../models/Hospital");

const authenticateHospital = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const hospital = await Hospital.findById(decoded.hospitalId);

      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      req.hospital = hospital;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = authenticateHospital;
