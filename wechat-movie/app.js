'use strict'

const koa = require('koa')
const sha1 = require('sha1')
const config = require('./wechat/config/config')
const wechat = require('./wechat/g')
const weixin = require('./wechat/weixin')
const ejs = require('ejs')
const heredoc = require('heredoc')


const app = koa();

const tpl = heredoc(() => {/*
  <!DOCTYPE html>
    <html>
      <head>
        <title>猜电影</title>
        <meta name="viewport" content="inital="1", maximun-scale=1, minimun=1">
      </head>
      <body>
        <h1>点击标题，开始录音翻译</h1>
        <p id="title"></p>
        <div id=post""></div>

        <script src="http://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
      </body>
    </html>
*/})

app.use(function *(next) {
  if (this.url.indexOf('movie') > -1) {
    this.body = ejs.render(tpl, {})
    return next;
  }
  yield next;
});

app.use(wechat(config.wechat, weixin.reply));

app.listen(3000)
console.log('成功启动服务，端口是 3000')

