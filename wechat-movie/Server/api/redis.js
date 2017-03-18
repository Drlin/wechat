const Promise = require('bluebird')
const redisClient = require('../../wechat/config/redis')
const REDIS_PREFIX = 'wechat_'

module.exports = {
	setRedis: function (key, value, expire) {
		return new Promise((resolve, reject) => {
			redisClient.set(`${REDIS_PREFIX}${key}`, JSON.stringify(value), (err, reply)=> {
				redisClient.expire('string key', expire);
				if (err) {
					reject(new Error(err));
				} else {
					resolve();
				}
			})
    	});
	},
	getRedis: function (key) {
		return new Promise((resolve, reject) => {
			redisClient.set(`${REDIS_PREFIX}${key}`,  (err, reply)=> {
        		if (err) {
					reject(new Error(err));
				} else {
					resolve(JSON.parse(reply));
				}
   			})
		}) 
	}
}