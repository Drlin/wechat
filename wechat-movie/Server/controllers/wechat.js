'use strict'

const config = require('../../wechat/config/config')
const wechat = require('../../wechat/g')
const weixin = require('../../wechat/weixin')
const Wechat = require('../../wechat/wechat')

const WechatApi = new Wechat(config.wechat);

module.exports = {
	hear: function *(next) {
		this.middle = wechat(config.wechat, weixin.reply);
		yield this.middle(next);
	},
	getMedia: function *() {
		WechatApi.getMedia(this.request.body.media_id)
		.then(() => {
			this.body = {
				status: 0,
				msg: '获取成功'
			}
		})
		.catch((e) => {
			this.body = {
				status: 1,
				msg: e
			}
		})
	}
}