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
        <p class="title">分类</p>
        <div class="text picker_input" @click="showPicker">
          {{picker_value}}
          <span><Icon type="down" /></span>
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
        <p class="tip">尺寸为400px*400px更容易过审核哦</p>
        <div v-show="!icon" class="uploader-pick" @click="wechatUploadImage('icon')"></div>
        <img 
          v-show="icon" 
          class="uploader-image" 
          :src="icon" 
          @click="wechatUploadImage('icon')" 
        />
      </div>
      <div class="release">
        <p class="title">二维码</p>
        <p class="tip">尺寸为400px*400px更容易过审核哦</p>
        <div v-show="!qrcode" class="uploader-pick" @click="wechatUploadImage('qrcode')"></div>
        <img 
          v-show="qrcode" 
          class="uploader-image" 
          :src="qrcode" 
          @click="wechatUploadImage('qrcode')"
        />
      </div>
      <div class="release media_ids">
        <p class="title">截图</p>
        <p class="tip">尺寸为750px*1334px更容易过审核哦</p>
        <span v-for="(item, i) in mediaIds" data-index="i" @click="deleteItem(i, $event)">
          <Icon type="close"/>
          <img 
            class="uploader-image" 
            :src="item"
          />
        </span>
        <div 
          v-show="mediaIds.length < 5" 
          class="uploader-pick" 
          @click="wechatUploadImages">
        </div>
      </div>
    </div>
    <div class="picker_container" v-show="picker">
      <div class="btn_container">
        <span @click="canclePicker">取消</span>
        <span @click="confirmPicker" class="confirm">确定</span>
      </div>
      <Picker :slots="slots" @change="onValuesChange" valueKey="name" />
    </div>
    <button class="bth" @click="postData" :disabled="isDisabled">
      发布
    </button>
    <div class="Spinner" v-show="isDisabled">
      <Spinner />
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { Picker, Toast, Spinner } from 'mint-ui'
import Icon from './common/Icon.vue'
export default {
  name: 'publish',
  components: {
    Picker,
    Icon,
    Spinner
  },
  data () {
    return {
      form: {
        name: '',
        worker: '',
        description: '',
        catagory: '',
        icon: '',
        qrcode: '',
        screenshot: []
      },
      mediaIds: [],
      icon: '',
      qrcode: '',
      picker_obj: {},
      picker_value: '',
      picker: false,
      isDisabled: false,
      slots: [
        {
          flex: 1,
          values: []
        }
      ]
    }
  },
  created () {
    let {href} = location
    this.$http.get(`/api/verify/getConfig?wechatHref=${href}`).then((res) => {
      let {status, params} = res.body
      let {nonceStr, timestamp, signature} = params
      if (status === 0) {
        wx.config({
          debug: false,
          appId: 'wxf850ce602b6ff3f3',
          timestamp,
          nonceStr,
          signature,
          jsApiList: [
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage'
          ]
        })
      }
    })
    this.$http.get('/api/catagory/catagorys').then((res) => {
      let {status, data} = res.body
      if (status === 0) {
        this.slots[0].values = data.splice(2, 30)
      }
    })
  },
  methods: {
    chooseImage () {
      return new Promise((resolve, reject) => {
        wx.chooseImage({
          count: 1,
          success (res) {
            resolve(res)
          }
        })
      })
    },
    showPicker () {
      this.picker = true
    },
    uploadImage (localId) {
      return new Promise((resolve, reject) => {
        wx.uploadImage({
          localId,
          isShowProgressTips: 1,
          success (res) {
            resolve(res)
          }
        })
      })
    },
    wechatUploadImage (type) {
      wx.ready(() => {
        this.chooseImage()
        .then((res) => {
          let localIds = res.localIds
          this.uploadImage(localIds[0])
          .then((res) => {
            let serverId = res.serverId
            this[type] = localIds[0]
            this.form[type] = serverId
          })
        })
      })
    },
    wechatUploadImages () {
      wx.ready(() => {
        this.chooseImage()
        .then((res) => {
          let localIds = res.localIds
          this.uploadImage(localIds[0])
          .then((res) => {
            let serverId = res.serverId
            this.mediaIds.push(localIds[0])
            this.form.screenshot.push(serverId)
          })
        })
      })
    },
    postData () {
      let { form } = this
      let arr = Object.keys(form)
      for (let i = 0; i < arr.length; i++) {
        if (!form[arr[i]] || form.screenshot.length === 0) {
          Toast('请填写完整信息')
          return
        }
      }
      this.isDisabled = true
      this.$http.post(`/api/verify/apply`, form)
      .then((res) => {
        this.isDisabled = false
        Toast('保存成功')
      })
    },
    onValuesChange (picker, values) {
      this.picker_obj = values
    },
    canclePicker () {
      this.picker = false
    },
    deleteItem (i, e) {
      if (e.target.tagName.toLocaleLowerCase() === 'i') {
        this.mediaIds.splice(i, 1)
        this.form.screenshot.splice(i, 1)
      }
    },
    confirmPicker () {
      let {_id, name} = this.picker_obj[0]
      this.form.catagory = _id
      this.picker_value = name
      this.picker = false
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .lists {
    padding-bottom: 4rem;
  }
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
  .release > .tip {
    color: #bbbbbb;
    font-size: 1.2rem;
  }
  .release > .text {
    border: 1px solid #eaeaea;
    position: relative;
    margin-top: .5rem;
    height: 40px;
  }
  .release > .text.picker_input {
    padding-left: 1rem;
    line-height:  40px;
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
    position: fixed ;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4rem;
    outline: none;
    border: 0;
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
  .uploader-image {
    width: 10rem;
    height: 10rem;
    margin-top: .5rem;
  }
  .picker_container {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;
    background: rgba(0,0,0,.6);
  }
  .picker_container > .btn_container {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding-top: 0.5rem;
  }
  .btn_container > span {
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
  }
  .media_ids > span {
    display: inline-block;
    position: relative;
    width: 10rem;
    height: 10rem;
    margin-right: 1rem;
  }
  .media_ids > span > i {
    position: absolute;
    font-size: 1.8rem;
    top: 0;
    left: 0;
    z-index: 10;
    color: #41BE57;
    transform: translateX(-50%);
  }
  .media_ids > div {
    display: inline-block;
  }
  .btn_container > span:nth-child(2) {
    color: #fa8919;
  }
  .picker_container > .picker {
    background: #fff;
    width: 100%;
  }
  .Spinner {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.6);
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
</style>
