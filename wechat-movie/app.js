'use strict'

var koa = require('koa')


var app = koa()

var config = {
  wechat: {
    appID: 'wxf850ce602b6ff3f3',
    appsecret: '8e9c19cce14ba53b6c7bfe346891d108',
    Token: 'myToken'
  }
}

app.use(function *(next){
  console.log(this.query)
  this.body = 'Hello World';
});

app.listen(3000)



console.log('成功启动服务，端口是 3000')

