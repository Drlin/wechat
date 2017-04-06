'use strict'

const config = require('../../wechat/config/config')
const wechat = require('../../wechat/g')
const weixin = require('../../wechat/weixin')
const Wechat = require('../../wechat/wechat')
const qiniu = require('../api/qiniu')
const WechatApi = new Wechat(config.wechat);

module.exports = {
	hear: function *(next) {
		this.middle = wechat(config.wechat, weixin.reply);
		yield this.middle(next);
	},
	getMedia: function *() {
		try {
			yield WechatApi.getMedia(this.request.body.media_id)
		} catch (e) {
			return this.body = {
				status: 1,
				msg: e
			}
		}
		let key = `${media_id}.png`
		let uptoken = qiniu.uptoken(key)
		try {
			yield uploadFile (uptoken, key, `image/${key}`)
		} catch (e) {
			return this.body = {
				status: 1,
				msg: e
			}
		}
		this.body = {
			status: 0,
			msg: '获取成功'
		}
	}
}