'use strict'

const config = require('./config/config');
const Wechat = require('./wechat.js');
const fs = require('fs')

const reply = function* (next) {
	const wechat = new Wechat(config.wechat);
	let data = '';
	let message = this.weixin;
	if (message.MsgType === 'event' && message.Event === 'subscribe') {
		this.body = `你看时钟上的时针和秒针，他们一天能遇见一千四百三十八次。自我出现以来，已经过去${Date.now() - config.timeUp * 1000}秒，可我只遇见你一次。`
	} else if (message.MsgType === 'text') {
		let {Content} = message;
		switch (Content) {
			case '裸照': 
				data = yield wechat.uploadMaterial('image',  `${__dirname}/裸照.jpg`);
				
			this.body = {
				type: 'image',
				media_id: data.media_id
			}
			break;
			case '1': 
				data = yield wechat.uploadMaterial('image',  `${__dirname}/裸照.jpg`, {type: 'image'});
				console.log(data)
			this.body = {
				type: 'image',
				media_id: data.media_id
			}
			break;
			default: 
				this.body = message.Content;
			break;
		}
	} else {
		this.body = message.Content;
	}
	yield next;
}
module.exports = {
	reply 
}