'use strict'

var koa = require('koa')
var sha1 = require('sha1')
var wechat = require('./wechat/g')


var app = koa()

var config = {
  wechat: {
    appID: 'wxf850ce602b6ff3f3',
    appsecret: '8e9c19cce14ba53b6c7bfe346891d108',
    Token: 'myToken'
  }
}

app.use(wechat(config.wechat));

app.listen(3000)
console.log('成功启动服务，端口是 3000')

