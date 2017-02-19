const path = require('path')
const Util = require('../lib/Util')
const wechat_file = path.join(__dirname, './wechat.txt');

const config = {
  wechat: {
    appID: 'wxf850ce602b6ff3f3',
    appSecret: '8e9c19cce14ba53b6c7bfe346891d108',
    Token: 'myToken',
    getAccessToken() {
      return Util.readFileAsync(wechat_file);
    },
    saveAccessToken(data) {
      data = JSON.stringify(data)
      return Util.writeFileAsync(wechat_file, data);
    }
  },
  timeUp: 1487434365
}

module.exports = config;