'use strict'

const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const promise = require('promise')

const config = require('./wechat/config/config')
const Wechat = require('./wechat/wechat')
const menu = require('./wechat/lib/menu.js');
const game = require('./Server/controllers/game.js');
const wx = require('./Server/controllers/wechat.js')
const dbUrl = 'mongodb://localhost/wechat'

const app = koa();

mongoose.connect(dbUrl)
mongoose.Promise = require('bluebird')
const WechatApi = new Wechat(config.wechat);

WechatApi.deleteMenu().then(() => {
  return WechatApi.createMenu(menu)
})
.then((msg) => {
  console.log(msg)
})

const MovieModel = require('./Server/models/movie.js')

const router = new Router();

app.use(router.routes())
   .use(router.allowedMethods())

router.get('/movie', game.movie)
router.post('/wx', wx.hear)
router.get('/wx', wx.hear)
router.post('/save', function *(next) {
	let movie = new MovieModel({
		director: '',
		title: 1,
		doubanId: 2,
		poster: 3,
		year: 2,
		genres: 1
	})
	yield movie.save()
	console.log(movie)
	yield next;
})

app.use(function*(next){  
  if(parseInt(this.status) === 404){
     this.body = '404';
     return;
  }
  yield next;
})

app.listen(3000)
console.log('成功启动服务，端口是 3000')

