<template>
  <div class="store-detail">
    <div class="detail-header">
      <img 
        class="detail-img" 
        :src="data.icon"
      />
      <div class="detail-tips">
        <h2>{{data.name}}</h2>
        <p class="tags">{{data.slogan}}</p>
        <p class="count">浏览<span>{{data.viewNum}}</span>次</p>
      </div>
    </div>
    <div class="pic-container">
      <img v-for="(item, index) in data.screenshot" 
        :src="item" 
        width="150px" 
        height="auto"
        @click="showPics(index)"
      />
    </div>
    <div class="tips">
      <h2>产品介绍</h2>
      <div class="content">
        {{data.description}}
      </div>
    </div>
    <div class="activity-bar" @click="showModel">
      <div class="input">说说你的看法吧</div>
      <div class="activity-bar_r">
        <img src="../../static/message.png" class="message">
        <mt-badge size="small" color="#e82f1b">10</mt-badge>
      </div>
    </div> 
    <div class="comment">
      <h3 class="comment-title">全部评论</h3>
      <div class="comment-wrap">
        <div class="wrap-header">
          <img data-v-3211db36="" src="https://media.ifanrusercontent.com/media/tavatar/bd/e5/bde505626df40ab317c4092be514b353214f42f5.jpg" alt="评论作者头像">
          <div class="content-meta">
            <span class="nickname">Dr.林</span>
            <span class="time">27秒前</span>
          </div>
        </div>
        <div class="comment-content">
          小程序不错哦
        </div>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
    >
      <div class="comment-dialog">
        <textarea 
          class="textarea" 
          placeholder="请输入内容"
          v-model="form.content"
        >
        </textarea>
        <div class="limit_text" :class="{illegal: form.content.length > 200}">
          {{form.content.length}}/200
        </div>
        <div class="star-wrap">
          <span>评分: </span>
          <label 
            class="score" 
            for="" 
            v-for="i in [0, 1, 2, 3, 4]"
            :class="{checked: i < +form.score}"
          >
            <input type="radio" :value="i + 1" name="score" v-model="form.score" />
          </label>
        </div>
        <button class="submit-btn" @click="submit">发表评论</button>
        <p 
          v-if="dirty && (!form.score || !form.content)"
          class="error" 
        >
          不能为空哦
        </p>
        <p 
          v-if="dirty && (form.content.length > 200)"
          class="error"
        >
          长度过长
        </p>
      </div>
    </mt-popup>
    <v-Model 
      :pics="data.screenshot" 
      :vis="vis" 
      :picIndex="picIndex" 
      v-on:closeModel="close"
    >
    </v-Model>
  </div>
</template>

<script>
  import { Popup, Badge } from 'mint-ui'
  import Model from './common/Model'
  export default {
    components: {
      'v-Model': Model,
      'mt-popup': Popup,
      'mt-badge': Badge
    },
    data () {
      return {
        data: {
          screenshot: []
        },
        popupVisible: false,
        vis: false,
        picIndex: 0,
        form: {
          content: '',
          score: ''
        },
        dirty: false
      }
    },
    created () {
      this.$http.get(`/api/miniapp/${this.$route.params.id}`)
      .then((res) => {
        let {data, status} = res.body
        if (status === 0) {
          this.data = data
        }
      })
    },
    methods: {
      showModel () {
        this.popupVisible = true
      },
      showPics (index) {
        this.vis = true
        this.picIndex = +index
      },
      close () {
        this.vis = false
      },
      submit () {
        let { content, score } = this.form
        this.dirty = true
        if (!content || !score || score.length > 200) {
          return
        }
      }
    }
  }
</script>

<style scoped>
.store-detail{
  width: 100%;
  overflow: hidden;
  padding-bottom: 3.5rem;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9rem;
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid #f1f1f1;
} 
.detail-img{
  flex: 0 0 9rem;
  width: 9rem;
  height: 9rem;
}
.detail-tips{
  flex: 1;
  margin-left: 2rem;
} 
.tags, .count {
  margin-top: 0.8rem;
  font-size: 1.2rem;
  max-height: 4em;
  overflow: hidden;
} 
.count > span {
  color: #E82201;
}
.pic-container {
  display: flex;
  padding: 2.5rem 0rem 0 1.5rem;
  margin-right: 1.5rem;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
}
.pic-container > img {
  width: 14rem;
  height: 22.4rem;
  flex-shrink: 0;
  border: .01rem solid rgba(0,0,0,.06);
  margin-left: 1rem;
}
.pic-container > img:first-child {
  margin-left: 0;
}   
.tips {
  margin-top: 3rem;
  padding: 0 0.8rem;
}
.tips .h2 {
  font-size: 1.6rem;
  color: #3D464D;
  font-weight: 300;
}
.tips .content {
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 1.2rem;
  padding-bottom: 2rem;
  font-size: 1.4rem;
  color: #7D8994;
  line-height: 2rem;
  word-break: break-all;
}
.activity-bar {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  width: 100%;
  bottom: 0;
  height: 3.5rem;
  background: #f4f4f4;
  padding: 0 1rem;
}

.activity-bar .input {
  flex: 1;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #fff;
  color: #bcbcbc;
  border-radius: 2.5rem;
  text-indent: 1rem;
}
.activity-bar_r .message {
  width: 2rem;
  height: 2rem;
  vertical-align: middle;
}
.activity-bar_r {
  padding-left: 1rem;
}
.activity-bar_r > span {
  padding: 0 6px !important;
  position: relative;
  left: -.8rem;
  bottom: .6rem;
}
.mint-popup {
  width: 90%;
  border-radius: .6rem;
}
.comment-dialog {
  padding: 2rem .8rem 0;
  text-align: center;
}
.textarea {
  width: 100%;
  height: 8rem;
  resize: none;
  outline: none;
  font-size: 1.6rem;
}
.star-wrap {
  display: flex;
  justify-content: flex-end;
  margin: .5rem 0 0.5rem 0;
  padding-bottom: 0.5rem;
  font-size: 1.6rem;
  border-bottom: 1px solid #f1f1f1;
}
.illegal {
  color: red;
}
.limit_text {
  text-align: right;
}
.score {
  width: 1.8rem;
  height: 1.8rem;
  background: url(../../static/star.png);
  background-size: contain;
  margin-left: 0.2rem;
  vertical-align: middle;
}
.score.checked {
  background: url(../../static/star-light.png);
  background-size: contain;
}
.score > input[type="radio"] {
  appearance: none;
  width: 100%;
  height: 100%;
}
.submit-btn {
  text-align: center;
  background-color: #e82201;
  width: 8rem;
  height: 2.5rem;
  outline: 0;
  color: #fff;
  border-radius: .3rem;
  border: none;
  margin: 0.5rem 0 1rem 0;
}
.error {
  color: #E82F1B;
  text-align: center;
  width: 100%;
  font-size: 1.4rem;
  padding-bottom: 1rem;
}
.comment {
  padding: 0 0.8rem;
}
.comment-title {
  padding: 1rem 0;
  font-size: 1.4rem;
  color: #47525d;
  border-bottom: 1px solid #eaeef1;
}
</style>
