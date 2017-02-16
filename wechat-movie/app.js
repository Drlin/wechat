'use strict'

var koa = require('koa')
var sha1 = require('sha1')


var app = koa()

var config = {
  wechat: {
    appID: 'wxf850ce602b6ff3f3',
    appsecret: '8e9c19cce14ba53b6c7bfe346891d108',
    Token: 'myToken'
  }
}

app.use(function *(next){
  let query = this.query;
  let token = config.wechat.Token;
  let signature = query.signature;
  let echostr = query.echostr;
  let timestamp = query.timestamp;
  let nonce = query.nonce;
  let str = [token, timestamp, nonce].sort().join('');
  let sha = sha1(str);
  if (sha === signature) {
    this.body = echostr + '';
  }
});

app.listen(3000)
console.log('成功启动服务，端口是 3000')

