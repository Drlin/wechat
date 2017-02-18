'use strict'

const sha1 = require('sha1')
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

const prefix = 'https://api.weixin.qq.com/cgi-bin';
const api = {
  access_token: `${prefix}/token?grant_type=client_credential`
}

class Wechat {
  constructor(opts) {
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    this.getAccessToken()
    .then((data) => {
      try {
        data = JSON.parse(data)
      } catch(e) {
        return this.updateAccessToken();
      }

      if (this.isValidAccessToken(data)) {
        Promise.resolve(data)
      } else {
        return this.updateAccessToken();
      }
    })
    .then((data) => {
      this.access_token = data.access_token;
      this.expires_in = data.expires_in;
      this.saveAccessToken(data)
    })
  }

    isValidAccessToken(data) {
      if(!data || !data.access_token || !data.expires_in) {
        return false;
      }
      let expires_in = data.expires_in;
      let now = Date.now();
      if (now > expires_in) {
        return false
      } 
      return true;
    }

    updateAccessToken(data) {
      let url = `${api.access_token}&appid=${this.appID}&secret=${this.appSecret}`;
      return new Promise((resolve, reject) => {
        request({url: url, json: true}).then((response) => {
          let data = response[1];
          let now = Date.now();
          let expires_in = now + (data.expires_in - 20) * 1000;
          data.expires_in = expires_in
          resolve(data);
        })
      })
    }

}

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
      this.body = echostr + '';
    }
  }
}