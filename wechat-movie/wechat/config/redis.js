const redis = require('redis')
const redisUrl = 'mongodb://localhost:6379'
const redisClient = redis.createClient(redisUrl)

module.exports = {
	redisClient
}