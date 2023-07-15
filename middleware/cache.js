const redisClient = require('../config/redisconf');

const getFromCache = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, data) => {
      if (err) {
        console.error('Error retrieving data from Redis cache:', err);
        reject(err);
      } else {
        resolve(data ? JSON.parse(data) : null);
      }
    });
  });
};

const setInCache = (key, data, expiration = 3600) => {
  return new Promise((resolve, reject) => {
    const value = JSON.stringify(data);
    redisClient.setex(key, expiration, value, (err) => {
      if (err) {
        console.error('Error setting data in Redis cache:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const deleteFromCache = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (err) => {
      if (err) {
        console.error('Error deleting data from Redis cache:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  getFromCache,
  setInCache,
  deleteFromCache,
};
