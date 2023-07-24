const Redis = require("ioredis");
const logger = require("../utils/logger");

const redisClient = new Redis({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on("error", (err) => {
  logger.error("Redis connection error:", err.message);
});
redisClient.on("connect", () => {
  logger.info("Redis connected");
});

module.exports = { redisClient };
