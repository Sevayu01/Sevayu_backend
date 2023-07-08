const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const axios = require("axios");
const connectDB = require('./config/connectDB');
app.use(cors());
const port = process.env.PORT || 5000;
dotenv.config({ path: './config/config.env' });
const uri = process.env.uri;

/* register the middleware functions for the routes */

app.use('/api/search', require('./routes/search'));
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
  connectDB();
}
);
