const { createClient }  = require('redis');

if (!process.env.REDIS_PASS) {
    throw new Error('Missing REDIS_PASS. Add your Redis password to Progress_3/.env.');
}

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'tent-berry-vase-11147.db.redis.io',
        port: 16207
    }
});

module.exports = redisClient;