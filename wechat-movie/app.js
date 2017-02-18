'use strict'

const koa = require('koa')
const sha1 = require('sha1')
const wechat = require('./wechat/g')
const path = require('path')
const Util = require('./wechat/lib/Util')
const wechat_file = path.join(__dirname, './wechat/config/wechat.txt');

const app = koa();

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
  }
}

app.use(wechat(config.wechat));

app.listen(3000)
console.log('成功启动服务，端口是 3000')

