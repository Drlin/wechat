'use strict'

const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')

const config = require('./wechat/config/config')
const Wechat = require('./wechat/wechat')
const menu = require('./wechat/lib/menu.js');
const game = require('./Server/controllers/game.js');
const wx = require('./Server/controllers/wechat.js')
const dbUrl = 'mongodb://localhost/imooc'

mongoose.Promise = require('bluebird');
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

app.use(router.routes())
   .use(router.allowedMethods())

router.get('/movie', game.movie)
router.post('/wx', wx.hear)
router.get('/wx', wx.hear)

app.use(function*(next){  
  if(parseInt(this.status) === 404){
     this.body = '404';
     return;
  }
  yield next;
})

app.listen(3000)
console.log('成功启动服务，端口是 3000')

