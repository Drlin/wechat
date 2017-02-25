'use strict'

const koa = require('koa')
const sha1 = require('sha1')
const config = require('./wechat/config/config')
const wechat = require('./wechat/g')
const weixin = require('./wechat/weixin')

const app = koa();

app.use(function *(next) {
  if (this.url.indexOf('movie') > -1) {
    this.body = '<h1>老铁好</h1>'
    return next;
  }
  yield next;
});

app.use(wechat(config.wechat, weixin.reply));

app.listen(3000)
console.log('成功启动服务，端口是 3000')

