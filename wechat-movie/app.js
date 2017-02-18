'use strict'

const koa = require('koa')
const sha1 = require('sha1')
const config = require('./wechat/config/config')
const wechat = require('./wechat/g')

const app = koa();

app.use(wechat(config.wechat));

app.listen(3000)
console.log('成功启动服务，端口是 3000')

