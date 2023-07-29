const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const socketIO = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/connectDB");
const logger = require("./utils/logger");
const consultationSocket = require("./sockets/consultationSocket");

dotenv.config({ path: "./config/config.env" });

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDB();

app.use("/api/search", require("./routes/search"));
app.use("/api/auth/user", require("./routes/user_auth"));
app.use("/api/auth/hospital", require("./routes/hospital_auth"));
app.use("/api/doctor", require("./routes/doctors"));
app.use("/api/labtest", require("./routes/labtest"));
app.use("/api/user", require("./routes/user"));
app.use("/api/hospital", require("./routes/hospital"));
app.use("/api/bloodbank", require("./routes/bloodbank"));

const port = process.env.PORT || 5000;
server.listen(port, () => {
  logger.info(`Server started on http://localhost:${port}`);
});
consultationSocket(io);
module.exports = app;
