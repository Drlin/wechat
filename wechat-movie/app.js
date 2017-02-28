'use strict'

const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')

const config = require('./wechat/config/config')
const wechat = require('./wechat/g')
const weixin = require('./wechat/weixin')
const Wechat = require('./wechat/wechat')
const menu = require('./wechat/lib/menu.js');
const game = require('./Server/controllers/game.js');
var dbUrl = 'mongodb://localhost/imooc'

mongoose.connect(dbUrl)


const WechatApi = new Wechat(config.wechat);

WechatApi.deleteMenu().then(() => {
  return WechatApi.createMenu(menu)
})
.then((msg) => {
  console.log(msg)
})

const app = koa();
const router = new Router();
router.get('/movie', game.movie)

app.use(router.routes())
   .use(router.allowMethods())


app.use(wechat(config.wechat, weixin.reply));

app.listen(3000)
console.log('成功启动服务，端口是 3000')

