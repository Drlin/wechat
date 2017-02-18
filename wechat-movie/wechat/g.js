'use strict'

const sha1 = require('sha1')
const Promise = require('bluebird');
const getRawBody = require('raw-Body');

const Wechat = require('./wechat.js')
const Util = require('./lib/Util')

module.exports = function(opts) {
  const wechat = new Wechat(opts);

  return function *(next){
    let query = this.query;
    let token = opts.Token;
    let signature = query.signature;
    let echostr = query.echostr;
    let timestamp = query.timestamp;
    let nonce = query.nonce;
    let str = [token, timestamp, nonce].sort().join('');
    let sha = sha1(str);
    if (sha === signature) {
      if (this.method === 'POST') {
        let data = yield getRawBody(this.req, {
          length: this.length,
          limit: '1mb',
          encoding: this.charset
        }) //yield 在某些点暂停函数的执行

        const content = yield Util.parseXMLAsync(data);

        const message = yield Util.formatMessage(content.xml);
        console.log(message)
      }
      this.body = echostr + '';
    }
  }
}