'use strict'

const config = require('../../wechat/config/config')
const wechat = require('../../wechat/g')
const weixin = require('../../wechat/weixin')

exports.hear = function *(next) {
	this.middle = wechat(config.wechat, weixin.reply);
	yield this.middle(next);
}