const Redis = require('ioredis');

const redisClient = new Redis({
  host: '127.0.0.1',
  port: 6379,
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = {redisClient};
