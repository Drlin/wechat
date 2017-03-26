<template>
  <div class="module">
    <div class="title">
      <span>{{title}}</span>
      <a href="/app/" class="all">显示全部</a>
    </div>
    <div class="scroll-module">
      <template v-for="item in data">
        <router-link :to="`/app/${item._id}`">
          <div class="icon">
            <img :src="item.icon" width="100%" height="100%" />
          </div>
          <p class="name">{{item.name}}</p>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Module',
  data () {
    return {
    }
  },
  props: ['title', 'data']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title > span {
  font-size: 1.7rem;
  color: #303030;
}
.title > a {
  color: #808080;
  padding-right: 1.5rem;
  background: url(../../../static/right.png) no-repeat center right;
  background-size: contain;
}
.scroll-module {
  display: flex;
  padding-left: 1.5rem;
  margin-right: 2rem;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch; /* ios 卡顿问题*/
}
.scroll-module > a {
  width: 8rem;
  flex-shrink: 0;
  height: 12rem;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.14);
  border-radius: .3rem;
  text-align: center;
}
.scroll-module .icon {
  width: 6rem;
  height: 6rem;
  margin: 1rem auto;
  border-radius: .1rem;
  overflow: hidden;
  background: #F7F7F7;
}
.scroll-module .name {
  color: #202020;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.scroll-module > a {
  margin-left: 0.5rem;
}
</style>
