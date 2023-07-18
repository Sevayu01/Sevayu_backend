const User = require("../models/Users");
const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
};
module.exports = { getuser };
