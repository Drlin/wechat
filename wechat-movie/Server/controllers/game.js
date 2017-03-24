'use strict'
const ejs = require('ejs')
const crypto = require('crypto')
const heredoc = require('heredoc')
const sha1 = require('sha1')

const config = require('../../wechat/config/config')
const Wechat = require('../../wechat/wechat')

/*const tpl = heredoc(() => {
  <!DOCTYPE html>
    <html>
      <head>
        <title>猜电影</title>
        <meta name="viewport" content="inital="1", maximun-scale=1, minimun=1">
      </head>
      <body>
        <h1>点击标题，开始录音翻译恩</h1>
        <p id="title"></p>
        <div id=post""></div>
        <script src="http://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
        <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script>
          wx.config({
              debug: true,
              appId: 'wxf850ce602b6ff3f3',
              timestamp: '<%= timestamp %>', 
              nonceStr: '<%= nonceStr %>', 
              signature: '<%= signature %>',
              jsApiList: [
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'translateVoice'
              ] 
          }); 
          wx.ready(function() {
            $('h1').on('tap', function(){
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
      </body>
    </html>
})*/
function _sign(nonceStr, ticket, timestamp, url) {
  const params = [
    `noncestr=${nonceStr}`,
    `jsapi_ticket=${ticket}`,
    `timestamp=${timestamp}`,
    `url=${url}`
  ]
  let str = params.sort().join('&')
  return sha1(str)
}

let createNonce = function() {
  return Math.random().toString(36).substr(2, 15);
}

let createTimestamp = function() {
  return parseInt(new Date().getTime()/1000, 10);
}

function sign(ticket, url) {
  let nonceStr = createNonce();
  let timestamp = createTimestamp();
  let signature = _sign(nonceStr, ticket, timestamp, url);
  return {
    nonceStr, timestamp, signature
  }
}

exports.movie = function *() {
	const wechatApi = new Wechat(config.wechat);
  const data = yield wechatApi.fetchAccessToken();
  const access_token = data.access_token;
  const ticketData = yield wechatApi.fetchTicket(access_token);
  const params = sign(ticketData.ticket, this.href)
  this.body = {
    status: 0,
    params
  }
  //this.body = ejs.render(tpl, params)
  return;
}