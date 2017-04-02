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
    <div class="activity-bar">
      <div class="activity-bar_l" @click="showModel">说说你的看法吧</div>
      <div 
        class="activity-bar_r" 
        :class="{isLove, heartAnimation}"
        @click="collection">
      
      </div>
    </div> 
    <div class="rate">
      <div>
        <span class="red-bar"></span>
        <h2>{{data.name}}评价</h2>
      </div>
      <div class="rate-overal"> 
        <div class="rate-inner">
          <span class="rating-num">{{overall_rating || 0}}</span>
          <div class="rating-wrap">
            <Star :rating="+overall_rating || 0"/>
            <p>共{{total}}个评分</p>
          </div>
        </div>
        <div class="rate-detail">
          <v-progress :rating="data.rating" :total="total"/>
        </div>
      </div>
    </div>

    <div class="comment" v-if="comments.length > 0">
      <h3 class="comment-title">全部评论</h3>
      <div 
        class="comment-wrap" 
        v-for="item in comments"
      >
        <div class="wrap-header">
          <div class="content-meta">
            <img :src="item.from.portrait" alt="评论者头像">
            <div class="content-r"> 
              <span class="nickname">{{item.from.name}}</span>
              <Star :rating="item.star"/>
            </div>
          </div>
          <span class="time">{{time( item.meta.createAt )}}</span>
        </div>
        <div class="comment-content">
          {{item.content | htmlDecode | filterTag}}
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
          maxlength="200" 
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
      @closeModel="close"
    >
    </v-Model>
  </div>
</template>

<script>
  import moment from 'moment'
  import { Popup, Toast } from 'mint-ui'
  import Icon from './common/Icon.vue'
  import Model from './common/Model'
  import Star from './common/Star'
  import Progress from './common/Progress'
  import {config} from './config/config'
  export default {
    components: {
      'v-Model': Model,
      'mt-popup': Popup,
      'Star': Star,
      'v-progress': Progress,
      'Icon': Icon
    },
    data () {
      return {
        data: {
          screenshot: [],
          rating: [],
          overall_rating: ''
        },
        popupVisible: false,
        vis: false,
        picIndex: 0,
        form: {
          content: '',
          score: ''
        },
        dirty: false,
        total: 0,
        isLogin: false,
        isLove: false,
        heartAnimation: false,
        comments: []
      }
    },
    computed: {
      overall_rating () {
        let value = String(this.data.overall_rating)
        return value.slice(0, value.indexOf('.') + 3)
      }
    },
    created () {
      let miniappId = this.$route.params.id
      localStorage.getItem('token') && this.$http.get(`/api/collection/collectionList?miniappId=${miniappId}`)
      .then((res) => {
        this.isLogin = true
        let {data, status} = res.body
        if (status === 0) {
          data.map((item) => {
            if (item.miniapp === miniappId) {
              this.isLove = true
            }
          })
        }
      })
      .catch((e) => {
        if (e.status === 401) {
          this.isLogin = false
        }
      })
      this.getData()
    },
    methods: {
      time (value) {
        moment.locale('cn', config.moment)
        return moment(value).fromNow()
      },
      getData () {
        let miniappId = this.$route.params.id
        this.$http.get(`/api/miniapp/${miniappId}`)
        .then((res) => {
          let {data, status} = res.body
          this.total = 0
          if (status === 0) {
            this.data = data
            data.rating.map((item) => {
              this.total += item
            })
          }
        })
        this.$http.get(`/api/miniapp/commentLists?miniappId=${miniappId}`)
        .then((res) => {
          let {data, status} = res.body
          if (status === 0) {
            this.comments = data
          }
        })
      },
      showModel () {
        if (this.isLogin) {
          this.popupVisible = true
          return
        }
        this.$router.push('/signup')
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
        this.$http.post('/api/comment/create', {
          content,
          star: score,
          miniappId: this.$route.params.id
        }).then((res) => {
          let {status} = res.body
          if (status === 0) {
            this.popupVisible = false
            this.getData()
            Toast('评论成功')
          }
        })
      },
      collection () {
        this.$http.post('/api/collection/operate', {
          miniappId: this.$route.params.id
        }).then((res) => {
          let {status} = res.body
          if (status === 0) {
            this.isLove = !this.isLove
            if (this.isLove) {
              this.heartAnimation = true
            } else {
              this.heartAnimation = false
            }
          }
        })
      },
      handleClick (i) {
        console.log(i)
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
  flex: 0 0 7rem;
  width: 7rem;
  height: 7rem;
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

.activity-bar .activity-bar_l {
  flex: 1;
  height: 2.5rem;
  line-height: 2.5rem;
  background: #fff;
  color: #bcbcbc;
  border-radius: 2.5rem;
  text-indent: 1rem;
}
.activity-bar_r {
  flex: 0 0 5rem;
  flex-shrink: 0;
  background: url(/static/web_heart_animation.png) no-repeat left center;
  background-size: 2900%;
  height: 5rem;
}
.activity-bar_r.isLove {
  background-position: right;
}
.activity-bar_r.heartAnimation {
  animation: heartAnimation;
  animation-duration: 0.8s;
  animation-timing-function: steps(28);
  animation-iteration-count: 1;
}
@keyframes heartAnimation {
  0% {
    background-position: left center;
  }
  100% {
    background-position: right center;
  }
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
  padding: 0.5rem 1.5rem;
}
.comment-title {
  padding: 1rem 0;
  font-size: 1.4rem;
  color: #47525d;
  border-bottom: 1px solid #eaeef1;
}
.comment-wrap {
  padding: 0.5 1rem;
  border-bottom: 1px solid #eaeef1;
}
.wrap-header {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}
.wrap-header > .content-meta > img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.content-meta {
  display: flex;
  align-items: center;
}
.content-r {
  margin-left: 1rem;
}
.comment-content {
  margin: .5rem 0 .5rem 4rem;
  font-size: 1.4rem;
  color: #3d464d;
  word-break: break-all;
}
.rate {
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
}
.rate > div > h2 {
  display: inline-block;
  vertical-align: middle;
}
.red-bar {
  display: inline-block;
  width: .4rem;
  height: 1.6rem;
  background-color: #e82201;
  margin-right: .8rem;
  vertical-align: middle;
}
.rate-overal {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.rating-wrap {
  display: inline-block;
  vertical-align: middle;
}
.rating-num {
  margin-top: 2rem;
  font-size: 4.4rem;
  color: #3d464d;
  font-weight: bold;
  margin-right: 2rem;
  vertical-align: middle;
}
</style>
