<template>
  <div class="lists">
    <h2>发布小程序</h2>
    <div class="container">
      <div class="release">
        <p class="title">名称</p>
        <div class="text">
          <input type="text" maxlength="15" v-model="form.name">
          <span>{{form.name.length}}/15</span>
        </div>
      </div>
      <div class="release">
        <p class="title">作者</p>
        <div class="text">
          <input type="text" maxlength="15" v-model="form.worker">
          <span>{{form.worker.length}}/15</span>
        </div>
      </div>
      <div class="release">
        <p class="title">介绍</p>
        <div class="text textarea">
          <textarea type="text" maxlength="300" v-model="form.description"></textarea>
          <span>{{form.description.length}}/300</span>
        </div>
      </div>
      <div class="release">
        <p class="title">图标</p>
        <div class="uploader-pick"  @click="uploadImage"></div>
      </div>
    </div>
    <a class="bth">
      发布
    </a>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'publish',
  data () {
    return {
      form: {
        name: '',
        worker: '',
        description: ''
      }
    }
  },
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
            'translateVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'
          ]
        })
      }
    })
  },
  methods: {
    uploadImage () {
      wx.ready(() => {
        wx.chooseImage({
          count: 1,
          success: function (res) {
            let localIds = res.localIds
            console.log(localIds)
          }
        })
      })
    }
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
  .container {
    padding: 0 0.5rem;
  }
  .release {
    margin: 1rem 0.5rem;
    box-sizing: border-box;
  }
  .release > p {
    color: #303030;
    font-size: 1.4rem;
  }
  .release > .text {
    border: 1px solid #eaeaea;
    position: relative;
    margin-top: .5rem;
    height: 3rem;
  }
  .release > .textarea {
    height: 8rem;
  }
  .release > .text > input, .release > .text > textarea {
    width: 100%;
    height: 100%;
    font-size: 1.4rem;
    padding-left: 1rem;
  }
  .release > .textarea > textarea {
    width: 80%;
    height: 90%;
    resize: none;
  }
  .release > .text > span {
    position: absolute;
    top: 50%;
    right: 1rem;
    color: #bbbbbb;
    transform: translateY(-50%);
  }
  .release > .textarea > span {
    top: 80%;
  }
  .bth {
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    background: #0db252;
    color: #fff;
    font-size: 1.4rem;
    text-align: center;
  }
  .uploader-pick {
    width: 10rem;
    height: 10rem;
    margin-top: .5rem;
    background: url(/static/uploader.jpg) no-repeat;
    background-size: contain;
  }
</style>
