<template>
  <div class="user">
    <div class="user-profile">
      <div class="user-img">
        <img class="user-img-pic" :src="user.portrait" width="100%" height="100%" alt="头像">
      </div>
      <div class="user-name">{{user.name}}</div>
    </div>
    <div class="entrance-wrap">
      <router-link to="upload">
        <span>
          我的发布
        </span>
        <Icon type="next"/>
      </router-link>
      <router-link to="collection">
        <span>
          我的收藏
        </span>
        <Icon type="next" />
      </router-link>
      <span class="loginout" @click="loginout">
        退出登录
      </span>
    </div>
  </div>
</template>

<script>
import Icon from './common/Icon.vue'
export default {
  name: 'User',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.$http.get(`/api/UserCenter`).then((res) => {
      let {status, data} = res.body
      if (status === 0) {
        this.user = data
      }
    })
  },
  components: {
    'Icon': Icon
  },
  methods: {
    loginout () {
      try {
        localStorage.clear('token')
        this.$router.push('/')
      } catch (e) {

      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-profile {
    background-image: linear-gradient(top,#388EFF,#409FFD);
    display: flex;
    padding: 17px 16px;
  }
  .user-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-right: 17px;
  }
  .user-img-pic {
    border-radius: 50%;
  }
  .user-name {
    color: #fff;
    font-size: 18px;
    margin-top: 11px;
    max-width: 220px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .entrance-wrap > a {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    height: 6rem;
    font-size: 1.8rem;
    color: #3d464d;
    border-bottom: 1px solid #e0e0e0;
  }
  .entrance-wrap > a > i {
    color: #c1c9d0;
  }
  .loginout {
    display: inline-block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 3.5rem;
    line-height: 3.5rem;
    margin-top: 5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    font-size: 1.6rem;
    color: #333;
    border-radius: .2rem;
  }
</style>
