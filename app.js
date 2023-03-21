const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");

app.use(cors());
const port = process.env.PORT || 5000;
dotenv.config();
const uri = process.env.uri;
app.use("/api/auth", require("./routes/user_auth"));

mongoose.set("strictQuery", true);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
});
