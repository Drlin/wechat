const redisClient = require('../../wechat/config/redis')
const REDIS_PREFIX = 'wechat_'

module.exports = {
	setRedis: function *(key, value, expire) {
		yield redisClient.set(`${REDIS_PREFIX}${key}`, JSON.stringify(value));
		redisClient.expire('string key', expire);
	},
	getRedis: function *(key) {
		const reply = yield redisClient.get(`${REDIS_PREFIX}${key}`);
		return JSON.parse(reply)
	}
}