<template>
  <div class="hello">
    <div class="details-info">
      <div class="cover-container">
        <div class="img">
          <img :src="data.picurl" alt="电影封面" width="100%">
        </div>
        <div class="info">
          <p>{{data.title}}</br>{{data.year}}</p>
          <h5>{{data.genres.join(' ')}}</h5>
          <button class="want_btn btn">想看</button>
          <button class="watched_btn btn">看过</button>
        </div>
      </div>
    </div>
    <div class="details-section">
      <h1 class="heading">剧情概要</h1>
      <div class="multicol-column">
        <span>
          {{data.summary}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      data: {}
    }
  },
  created () {
    this.$http.get(`/api/movie/${this.$route.query.id}`).then((res) => {
      this.data = res.body
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.details-info {
  background-color: #eeeeee;
  border-bottom: 2px solid #d6d6d6;
  position: relative;
  width: 100%;
}
.cover-container {
  display: flex;
  padding: 15px 15px 0 15px;
}
.cover-container > .img {
  flex: 0 0 100px;
}
.cover-container > .info {
  flex: 1;
  padding-left: 10px;
}
.info .btn {
  border: 0;
  outline: none;
  background: #ED3B3B;
  color: #fff;
  margin-top: 20px;
  font-size: 14px;
  padding: 6px 30px;
}
.details-section {
  background-color: #f5f5f5;
  padding: 15px 15px 0 15px;
}
.details-section h1 {
  font-size: 22px;
  color: #333;
  font-weight: 100;
  margin: 0 0 10px 0;
}
.details-section .multicol-column {
  color: #777777;
}

</style>
