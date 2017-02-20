const fs = require('fs');
const prefix = 'https://api.weixin.qq.com/cgi-bin';
const api = {
  access_token: `${prefix}/token?grant_type=client_credential`,
  temporary: {
    upload: `${prefix}/media/upload`
  },
  permanent: {
    upload: `${prefix}/material/add_material?`,
    uploadNews: `${prefix}/material/add_news?`,
    uploadNewsPic: `${prefix}/media/uploadimg?`

  }
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
    this.fetchAccessToken();
  }

  fetchAccessToken() {
    if (this.access_token && this.expires_in) {
      if (this.isValidAccessToken(this)) {
        return Promise.resolve(this)
      }
    }
    return this.getAccessToken()
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
      return Promise.resolve(data)
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

  uploadMaterial(type, material, permanent) {
    let form = {
      media: fs.createReadStream(filepath)
    }

    let uploadUrl = api.temporary.upload;

    if (permanent) {
      // 上传永久素材
      uploadUrl = api.permanent.upload;
      form = {...form, ...permanent}
      }

    if (type === 'pic') {
      uploadUrl = api.permanent.uploadNewsPic
    }

    if (type === 'news') {
      uploadUrl = api.permanent.uploadNews;
      form = material;
    }

    return new Promise((resolve, reject) => {
      this.fetchAccessToken()
        .then((data) => {
          let url = `${uploadUrl}access_token=${data.access_token}`;
          url = permanent ? url : `${url}&type=${type}`;

          const options = {
            method: 'POST',
            url: url,
            json: true
          }
  
          if (type === 'news') {
            options.body = form
          }
          else {
            options.formData = form
          }

          request(options).then((response) => {
            let _data = response[1];
            if (_data) {
              resolve(_data)
            } else {
              throw new Error('上传失败')
            }
          })
          .catch((err) => {
            reject(err)
          })
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