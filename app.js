const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const axios = require("axios");
app.use(cors());
const port = process.env.PORT || 5000;
dotenv.config();
const uri = process.env.uri;
app.get("/api/search/:item", async (req, res) => {
  try{
  const item = await axios.get(
    `https://searchme.onrender.com/product/search/${req.params.item}`
  );
  return res.json(item.data);
  }
  catch(e){
    console.log(e);
  }
});
app.use("/api/auth/user", require("./routes/user_auth"));
app.use("/api/auth/hospital", require("./routes/hospital_auth"));
app.use("/api/doctor", require("./routes/doctors"));
app.use("/api/test", require("./routes/test"));
//app.use('/api/user', require('./routes/user'));
// app.use('/api/hospital', require('./routes/hospital'));
// app.use('/api/booking', require('./routes/booking'));
app.use("/api/user", require("./routes/user"));
app.use("/api/hospital", require("./routes/hospital"));
app.use("/api/bloodbank", require("./routes/bloodbank"));
mongoose.set("strictQuery", true);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
});
