const winston = require("winston");

const logLevels = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
};

const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(
      ({ level, message, timestamp }) =>
        `[${timestamp}] [${level.toUpperCase()}]: ${message}`,
    ),
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
