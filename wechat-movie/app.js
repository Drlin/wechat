'use strict'

const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const promise = require('promise')
const path = require('path');
const fs = require('fs')
const render = require('koa-swig');
const serve = require('koa-static')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const session = require('session')
const socket_io = require('socket.io')


const config = require('./wechat/config/config')
const Wechat = require('./wechat/wechat')
const menu = require('./wechat/lib/menu.js');
const game = require('./Server/controllers/game.js');
const wx = require('./Server/controllers/wechat.js')
const dbUrl = 'mongodb://localhost/wechat'

const app = koa();
mongoose.Promise = require('bluebird')
mongoose.connect(dbUrl)
const WechatApi = new Wechat(config.wechat);
const router = new Router();

WechatApi.deleteMenu().then(() => {
  return WechatApi.createMenu(menu)
})
.then((msg) => {
  console.log(msg)
})


require('./Server/routes/route')(router);

//app.use(session(app))
app.use(bodyParser())
app.use(router.routes())
   .use(router.allowedMethods())

//router.get('/movie', game.movie)
router.post('/wx', wx.hear)
router.get('/wx', wx.hear)

app.use(serve(path.resolve('html/dist')));

app.use(function*(next){  
  if(parseInt(this.status) === 404){
     this.body = '404';
     return;
  }
  yield next;
})

const io = socket_io.listen(app.listen(3000));

io.sockets.on('connection', (socket)=> {
  var messages = []
  socket.on('getAllMessages', ()=> {
    socket.emit('allMessages', messages)
  })
  socket.on('createMessage', (message)=> {
    messages.push(message)
    io.sockets.emit('allMessages', messages)
  })
})

console.log('成功启动服务，端口是 3000')

