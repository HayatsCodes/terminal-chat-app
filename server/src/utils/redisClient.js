const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
});

// Connect to Redis
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = redisClient;
