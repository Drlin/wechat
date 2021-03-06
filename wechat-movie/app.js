'use strict'

const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const path = require('path')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const jwt = require('koa-jwt')


const config = require('./wechat/config/config')
const Wechat = require('./wechat/wechat')
const menu = require('./wechat/lib/menu.js')
const wx = require('./Server/controllers/wechat.js')
const User = require('./Server/models/user')
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

router.use('/api', jwt({secret: 'lin'})
    .unless({path:  [/^\/api\/user/, /^\/api\/miniapp/, /^\/api\/catagory/]}));

app.use(function *(next) {
  let url = this.url
  let userId = this.state.user;
  if (!url.match(/^\/api\/user/)) {
    if (userId) {
      const user = yield User.findOne({_id: userId._id}).exec();
      if (!(user && user.verifyed === false)) {
        return this.body = {
          status: 1,
          msg: '未验证用户'
        }
      }
    }
  }
  yield next;
});

require('./Server/routes/route')(router);

app.use(bodyParser())
app.use(router.routes())
   .use(router.allowedMethods())

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

app.listen(3000);

console.log('成功启动服务，端口是 3000')

