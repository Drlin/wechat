'use strict'

const koa = require('koa')
const sha1 = require('sha1')
const ejs = require('ejs')
const crypto = require('crypto')
const heredoc = require('heredoc')

const config = require('./wechat/config/config')
const wechat = require('./wechat/g')
const weixin = require('./wechat/weixin')
const Wechat = require('./wechat/wechat')


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

        <script>
          wx.config({
              debug: true,
              appId: 'wxf850ce602b6ff3f3',
              timestamp: '<%= timestamp %>', 
              noncestr: '<%= noncestr %>', 
              signature: '<%= signature %>',
              jsApiList: [
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'translateVoice'
              ] 
          }); 
          alert(111)
          wx.ready(function() {
            $('h1').on('tap', function(){
              alert(11)
              wx.startRecord({
                cancel: function() {
                  alert('老铁，咋取消了呢')
                }
              });

              wx.stopRecord({
                success: function (res) {
                  const localId = res.localId;

                  wx.translateVoice({
                    localId,
                    isShowProgressTips: 1, 
                    success: function (res) {
                      alert(res.translateResult); 
                    }
                  });
                }
              })

            })
          })
        </script>
        <script src="http://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
      </body>
    </html>
*/})
function _sign(noncestr, ticket, timestamp, url) {
  const params = [
    `noncestr=${noncestr}`,
    `jsapi_ticket=${ticket}`,
    `timestamp=${timestamp}`,
    `url=${url}`
  ]
  let str = params.sort().join('&')
  let shanum = crypto .createHash('sha1')
  shanum.update(str)

  return shanum.digest('hex')
}

let createNonce = function() {
  return Math.random().toString(36).substr(2, 15);
}

let createTimestamp = function() {
  return parseInt(new Date().getTime() / 1000, 10) + '';
}

function sign(ticket, url) {
  let noncestr = createNonce();
  let timestamp = createTimestamp();
  let signature = _sign(noncestr, ticket, timestamp, url);
  return {
    noncestr, timestamp, signature
  }
}

app.use(function *(next) {
  if (this.url.indexOf('movie') > -1) {
    const wechatApi = new Wechat(config.wechat);
    const data = yield wechatApi.fetchAccessToken();
    const access_token = data.access_token;
    const ticketData = yield wechatApi.fetchTicket(access_token);
    const params = sign(ticketData.ticket, this.href)
    console.log(params)
    this.body = ejs.render(tpl, params)
    return;
  };
  yield next;
});

app.use(wechat(config.wechat, weixin.reply));

app.listen(3000)
console.log('成功启动服务，端口是 3000')

