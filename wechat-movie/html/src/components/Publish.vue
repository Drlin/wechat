<template>
  <div class="lists"
    <h2>发布小程序</h2>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'app',
  created () {
    let {href} = location
    this.$http.get(`/api/user/getConfig?wechatHref=${href}`).then((res) => {
      let {status, params} = res.body
      let {nonceStr, timestamp, signature} = params
      if (status === 0) {
        wx.config({
          debug: true,
          appId: 'wxf850ce602b6ff3f3',
          timestamp,
          nonceStr,
          signature,
          jsApiList: [
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'translateVoice'
          ]
        })
      }
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h2 {
    width: 100%;
    height: 4rem;
    text-align: center;
    font-size: 1.6rem;
    line-height: 4rem;
    background: #f8f8f8;
  } 
</style>
