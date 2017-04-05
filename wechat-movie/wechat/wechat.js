const fs = require('fs');
const _ = require('lodash')
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));

const Util = require('./lib/Util')

const prefix = 'https://api.weixin.qq.com/cgi-bin';
const api = {
  access_token: `${prefix}/token?grant_type=client_credential`,
  temporary: {
    upload: `${prefix}/media/upload?`
  },
  permanent: {
    upload: `${prefix}/material/add_material?`,
    uploadNews: `${prefix}/material/add_news?`,
    uploadNewsPic: `${prefix}/media/uploadimg?`
  },
  user: {
    get: `${prefix}/user/info`,
    batchget: `${prefix}/user/info/batchget`
  },
  menu: {
    create: `${prefix}/menu/create`,
    del: `${prefix}/menu/delete`,
    get: `${prefix}/menu/get`
  },
  ticket: {
    get: `${prefix}/ticket/getticket?`
  },
  media: {
    get: `${prefix}/media/get?`
  }
}

class Wechat {
  constructor(opts) {
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken;
    this.getTicket = opts.getTicket;
    this.saveTicket = opts.saveTicket;
    this.fetchAccessToken();
  }

  fetchTicket(access_token) {
    return this.getTicket()
    .then((data) => {
      try {
        data = JSON.parse(data)
      } catch(e) {
        return this.updateTicket(access_token);
      }

      if (this.isValidTicket(data)) {
        return Promise.resolve(data)
      } else {
        return this.updateTicket(access_token);
      }
    })
    .then((data) => {
      this.saveTicket(data)
      return Promise.resolve(data)
    })
  }

  updateTicket(access_token) {
    let url = `${api.ticket.get}access_token=${access_token}&type=jsapi`;
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

  isValidTicket(data) {
    if(!data || !data.ticket || !data.expires_in) {
      return false;
    }
    let expires_in = data.expires_in;
    let now = Date.now();
    if (now > expires_in) {
      return false
    } 
    return true;
  }

  fetchAccessToken() {
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
      media: fs.createReadStream(material)
    }

    let uploadUrl = api.temporary.upload;

    if (permanent) {
      // 上传永久素材
      uploadUrl = api.permanent.upload;
      _.extend(form, permanent)
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
          console.log(url)
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

  getUsers(openIds, lang) {
    lang = lang || 'zh-CN'
    return new Promise((resolve, reject) => {
      this.fetchAccessToken()
        .then((data) => {
          let url = `${api.user.get}?access_token=${data.access_token}&openid=${openIds}&lang=${lang}`;
          const options = {
            url,
            json: true
          }
          if (Array.isArray(openIds)) {
            url = `${api.user.batchget}?access_token=${data.access_token}`;
            options.body = {
              user_list: openIds
            }
            options.method = 'POST'
          }
          request(options)
            .then((response) => {
              let _data = response[1];
              if (_data) {
                resolve(_data) 
              } else {
                throw new Error('获取失败')
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
    })
  }


  createMenu(menu) {
    return new Promise((resolve, reject) => {
      this.fetchAccessToken()
        .then((data) => {
          let url = `${api.menu.create}?access_token=${data.access_token}`;
          const options = {
            url,
            json: true,
            body: menu,
            method: 'POST'
          }
          request(options)
            .then((response) => {
              let _data = response[1];
              if (_data) {
                resolve(_data) 
              } else {
                throw new Error('创建失败')
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
    })
  }

  getMenu() {
    return new Promise((resolve, reject) => {
      this.fetchAccessToken()
        .then((data) => {
          let url = `${api.menu.get}?access_token=${data.access_token}`;
          const options = {
            url,
            json: true
          }
          request(options)
            .then((response) => {
              let _data = response[1];
              if (_data) {
                console.log(_data)
                resolve(_data) 
              } else {
                throw new Error('获取失败')
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
    })
  }

  deleteMenu() {
    return new Promise((resolve, reject) => {
      this.fetchAccessToken()
        .then((data) => {
          let url = `${api.menu.del}?access_token=${data.access_token}`;
          const options = {
            url,
            json: true
          }
          request(options)
            .then((response) => {
              let _data = response[1];
              if (_data) {
                resolve(_data) 
              } else {
                throw new Error('删除失败')
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
    })
  }

  getMedia(media_id) {
    return new Promise((resolve, reject) => {
      this.fetchAccessToken()
        .then((data) => {
          let url = `${api.media.get}access_token=${data.access_token}&media_id=${media_id}`;
          const options = {
            url,
            json: true
          }
          request(options)
            .then((response) => {
              let _data = response[1];
              console.log(media_id, data.access_token)
              if (_data) {
                resolve(_data) 
              } else {
                throw new Error('获取失败')
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