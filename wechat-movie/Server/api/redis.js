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
	},
	saveToRank: function *(rankName, obj) {
		const result = yield redisClient.zincrby(rankName, 1, JSON.stringify(obj));
		return result;
	},
	getRank: function *(rankName) {
		const result = yield redisClient.zrevrange(rankName, 0, -1);
		let arr = []
		result.map((item) => {
			arr.push(JSON.parse(item))
		})
		return arr;
	}
}