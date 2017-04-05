const path = require('path')
const Util = require('../lib/Util')
const wechat_file = path.join(__dirname, './wechat.txt');
const wechat_ticket_file = path.join(__dirname, './wechat_ticket_file.txt');

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
    },
    getTicket() {
      return Util.readFileAsync(wechat_ticket_file);
    },
    saveTicket(data) {
      data = JSON.stringify(data)
      return Util.writeFileAsync(wechat_ticket_file, data);
    },
  },
  timeUp: 1487434365,
  qiniu: {
    AK: 'C51ie9211SP_Focs2fgz31iwqLRVsahJsLy4tmjp',
    SK: 'f7HjCzo7NT31zPs7WuoYkgMLp_9sD-h7PhicFIAI'
  }
}

module.exports = config;