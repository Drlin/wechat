<template>
  <div class="category">
    <h2>类别</h2>
    <div class="container">
      <router-link to="/app">
        <Icon type="search"/>
        <p>全部</p>
      </router-link>
      <router-link to="/app">
        <Icon type="search"/>
        <p>全部</p>
      </router-link>
      <router-link to="/app">
        <Icon type="search"/>
        <p>全部</p>
      </router-link>
      <router-link to="/app">
        <Icon type="search"/>
        <p>全部</p>
      </router-link>
      <router-link to="/app">
        <Icon type="search"/>
        <p>全部</p>
      </router-link>
      <router-link to="/app">
        <Icon type="search"/>
        <p>全部</p>
      </router-link>
      <router-link to="/app">
        <Icon type="search"/>
        <p>全部</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Icon from './common/Icon'
export default {
  components: {
    'Icon': Icon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  width: 100%;
  height: 4rem;
  text-align: center;
  font-size: 2rem;
  line-height: 4rem;
  background: #f8f8f8;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.container > a {
  flex: 0 0 33.3333%;
  padding: 3rem 0 3rem 0;
  text-align: center;
  align-self: center;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
</style>
