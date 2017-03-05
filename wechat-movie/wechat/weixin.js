'use strict'

const config = require('./config/config');
const Wechat = require('./wechat.js');
const Movie = require('../Server/api/movie.js');
const fs = require('fs');
const wechat = new Wechat(config.wechat);


const reply = function* (next) {
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
				// data = yield wechat.getUsers( message.FromUserName );
				// this.body = `${data.nickname}, 你说的是${message.Content}`;
				let content = message.Content;
				let movies = yield Movie.searchByName(content);
				let reply = []

				if (!movies || movies.length === 0) {
					movies = yield Movie.searchByDouban(content);
				}
				if (!movies) {
					reply = '没有找到， 老铁，要不要换个词试试'
					return;
				}
				movies.map((item) => {
					reply.push({
						title: item.title,
			            description: item.title,
			            picUrl: item.poster,
			            url: item.alt
					})
				})

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