const { createClient } = require('redis');
let redisClient;

if (process.env.NODE_ENV === 'production') {
    // Create a Redis client with the production redis url
    redisClient = createClient({
        url: `${process.env.REDIS_URL}`
    });
    
} else {
    // Create a Redis client with the default port
    redisClient = createClient();
}




redisClient.on('error', err => console.log('Redis Client Error', err));

module.exports = redisClient;
