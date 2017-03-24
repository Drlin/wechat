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
	saveToRank: function *(movie) {
		const result = yield redisClient.zincrby('movie_rank', 1, movie);
		return result;
	},
	getRank: function *() {
		const result = yield redisClient.zrevrange('movie_rank', 0, -1);
		return JSON.parse(result);
	}
}