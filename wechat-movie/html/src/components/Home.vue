<template>
  <div class="home">
    <div class="header">
      <div class="header-l">
        <h1>晓得程序</h1>
        <a href="/" class="board-name">小程序商店</a>
      </div>
      <div class="header-r">
        <a class="search" href="">
          <img src="../../static/search.png" alt="搜索">
        </a>
        <a class="portrait" href="">
          <img v-if="portrait" :src="portrait" alt="头像">
          <img v-else src="../../static/user.png" alt="头像">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      portrait: ''
    }
  },
  created () {
    this.$socket.emit('getAllMessages')
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin-right: .1rem;
  width: 4.4rem;
  height: 4.4rem;
  position: relative;
  border-left: .01rem solid #f1f1f1;
  border-right: .01rem solid #f1f1f1;
}
.search > img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2.2rem;
  height: 2.2rem;
}
.portrait {
  width: 4.4rem;
  height: 4.4rem;
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
</style>
