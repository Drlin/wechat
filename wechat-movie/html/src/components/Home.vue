<template>
  <div class="home">
    <div class="header">
      <div class="header-l">
        <h1>晓得程序</h1>
        <a href="/" class="board-name">小程序商店</a>
      </div>
      <div class="header-r">
        <router-link  :to="`/search`" class="search">
          <Icon type="search" />
        </router-link>
        <router-link class="portrait" to="user">
          <img v-if="portrait" :src="portrait" alt="头像">
          <Icon v-else type="user" />
        </router-link>
      </div>
    </div>
    <div class="store-banner-wrap">
      <img src="../../static/header-bar-wrap.jpg" alt="">
    </div>
    <div class="fast-nav">
      <a class="nav-item" href="/category">
        <img class="category" src="../../static/category.png" />
        <p>类别</p>
      </a>
      <a class="nav-item" href="/recommend">
        <img class="recommend" src="../../static/recommend.png" />
        <p>每日小程序推荐</p>
      </a>
      <a class="nav-item" href="/ranking">
        <img class="ranking" src="../../static/ranking.png" />
        <p>排行榜</p>
      </a>
    </div>
    <template v-for="(item, index) in dataArr">
      <Module :title="item" :data="miniappArr[index]"/>
    </template>
  </div>
</template>

<script>
import Module from './common/Module'
import Icon from './common/Icon.vue'
export default {
  name: 'Home',
  data () {
    return {
      portrait: '',
      dataArr: ['资讯', '旅行', '交通', '办公软件', '美食'],
      miniappArr: []
    }
  },
  created () {
    let fetchArr = []
    this.dataArr.map((item) => {
      fetchArr.push(this.$http.get(`/api/catagory/catagoryList?catagoryName=${item}`))
    })
    Promise.all(fetchArr)
    .then((data) => {
      data.map((item) => {
        let {status, data} = item.body
        if (status === 0) {
          this.miniappArr.push(data.miniapp)
        }
      })
    })
  },
  methods: {

  },
  components: {
    'Module': Module,
    'Icon': Icon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  width: 100%;
  overflow-x: hidden;
  padding-bottom: 2rem;
}
.header {
  position: relative;
  width: 100%;
  height: 4.4rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding-left: 1.3rem;
  border-bottom: 0.1rem solid #f1f1f1;
}
.header-l {
  display: flex;
  align-items: center;
}
.header-l > h {
  flex: 1;
}
.header-l > a {
  flex: 1;
}
.board-name {
  font-size: 1rem;
  color: #fff;
  margin-left: 1rem;
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
  background-color: #e82201;
  border-radius: 2.45rem;
}
.header-r {
  display: flex;
  align-items: center;
}
.search {
  display: inline-block;
  width: 4.4rem;
  height: 4.4rem;
  text-align: center;
  line-height: 4.3rem;
  position: relative;
  margin-right: .1rem;
  border-left: .01rem solid #f1f1f1;
  border-right: .01rem solid #f1f1f1;
}
.search > i, .portrait > i {
  font-size: 2rem;
  color: #303030;
  vertical-align: middle;
}
.portrait {
  width: 4.4rem;
  height: 4.4rem;
  line-height: 4.3rem;
  position: relative;
  text-align: center;
}
.portrait > img {
  width: 2.2rem;
  height: 2.2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.store-banner-wrap {
  width: 100%;
}
.fast-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #e5e5e5;
}
.nav-item {
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
}
.nav-item p {
  color: #303030;
  margin-top: 1rem;
}
.nav-item > img {
  width: 3rem;
  height: 3rem;
}
</style>
