const { createClient } = require('redis');

// Create a Redis client
const redisClient = createClient();


redisClient.on('error', err => console.log('Redis Client Error', err));

module.exports = redisClient;
