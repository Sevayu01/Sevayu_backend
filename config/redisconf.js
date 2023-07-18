const Redis = require("ioredis");
const logger = require("../utils/logger");

const redisClient = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

redisClient.on("error", (err) => {
  logger.error("Redis connection error:", err.message);
});

module.exports = { redisClient };
