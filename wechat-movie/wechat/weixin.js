'use strict'

const config = require('./config/config')

const reply = function* (next) {
	let message = this.weixin;
	if (message.MsgType === 'event' && message.Event === 'subscribe') {
		this.body = `你看时钟上的时针和秒针，他们一天能遇见一千四百三十八次。自我出现以来，已经过去${Date.now() - config.timeUp * 1000}秒，可我只遇见你一次。`
	} else {
		this.body = message.Content
	}
	yield next;
}
module.exports = {
	reply 
}