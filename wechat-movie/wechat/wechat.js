const prefix = 'https://api.weixin.qq.com/cgi-bin';
const api = {
  access_token: `${prefix}/token?grant_type=client_credential`
}
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

const Util = require('./lib/Util')

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
        return Promise.resolve(data)
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

    reply() {
      let content = this.body;
      let message = this.weixin;
      let xml = Util.tpl(content, message);
      this.status = 200;
      this.type = 'application/xml';
      this.body = xml;
    }
}

module.exports = Wechat;