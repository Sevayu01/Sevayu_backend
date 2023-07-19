const jwt = require("jsonwebtoken");
let token;
const getId = () => {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  return decoded.hospitalId;
};
const getToken = () => token;
const setToken = (data) => {
  token = data;
};

module.exports = { getId, setToken, getToken };
