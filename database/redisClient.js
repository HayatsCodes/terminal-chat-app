const redis = require('redis');
const redisClient = redis.createClient();

module.exports = redisClient;