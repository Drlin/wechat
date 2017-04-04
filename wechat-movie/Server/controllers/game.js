'use strict'
const ejs = require('ejs')
const crypto = require('crypto')
const heredoc = require('heredoc')
const sha1 = require('sha1')

const config = require('../../wechat/config/config')
const Wechat = require('../../wechat/wechat')

function _sign(nonceStr, ticket, timestamp, url) {
  const params = [
    `noncestr=${nonceStr}`,
    `jsapi_ticket=${ticket}`,
    `timestamp=${timestamp}`,
    `url=${url}`
  ]
  let str = params.sort().join('&')
  return sha1(str)
}

let createNonce = function() {
  return Math.random().toString(36).substr(2, 15);
}

let createTimestamp = function() {
  return parseInt(new Date().getTime()/1000, 10);
}

function sign(ticket, url) {
  let nonceStr = createNonce();
  let timestamp = createTimestamp();
  let signature = _sign(nonceStr, ticket, timestamp, url);
  return {
    nonceStr, timestamp, signature
  }
}

exports.movie = function *() {
  let wechatHref = this.query.wechatHref;
	const wechatApi = new Wechat(config.wechat);
  const data = yield wechatApi.fetchAccessToken();
  const access_token = data.access_token;
  const ticketData = yield wechatApi.fetchTicket(access_token);
  const params = sign(ticketData.ticket, `${wechatHref}#/publish`)
  this.body = {
    status: 0,
    params
  }
  //this.body = ejs.render(tpl, params)
  return;
}