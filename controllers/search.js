const client = require("../config/search");

const find = async (req, res) => {
  const text = req.query.text;
  client
    .index("Hospital")
    .search(text)
    .then((data) => {
      res.json({ data: data.hits });
    });
};

module.exports = { find };
