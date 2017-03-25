<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'app',
  created () {
    this.$http.get(`/api/getConfig`).then((res) => {
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

<style>
body, p, div, h1, h2, h3, h4, h5,input {
  margin: 0;
  padding: 0;
}
html {
  font-size: 62.5%;
}
input {
  outline: none;
}
a {
  text-decoration: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
