const { redisClient } = require('../config/redisconf');

const setInCache = (key, data, expiration = 3600) => {
  const value = JSON.stringify(data);
  return redisClient.set(key, value, 'EX', expiration);
};

const getFromCache = (key) => {
  return redisClient.get(key).then((value) => {
    if (value) {
      return JSON.parse(value);
    }
    return null;
  });
};

const deleteFromCache = (key) => {
  return redisClient.del(key);
};

module.exports = {
  setInCache,
  getFromCache,
  deleteFromCache,
};
