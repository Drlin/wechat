'use strict'

var sha1 = require('sha1')

module.exports = function(opts) {
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
      this.body = echostr + '';
    }
  }
}