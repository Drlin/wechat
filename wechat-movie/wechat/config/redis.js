const redis = require('redis')
const coRedis = require('co-redis')
const db = redis.createClient(6379, 'localhost')
const dbCo = coRedis(db); 

dbCo.on('connect', () => {
	console.log('redis连接成功')
})
module.exports = dbCo;