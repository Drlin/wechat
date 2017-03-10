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
    <div class="details-section movies">
      <h1 class="heading">评价</h1>
      <div class="score">
        <div class="score-container">
          <div class="score">{{(+data.rating).toFixed(1)}}</div>
          <div class="reviews-stats">
            <span class="reviewers-small"></span> 共 
            <span class="reviews-num">398</span> 条评价</div>
        </div>
        <div class="rating-histogram">
          <div class="rating-bar-container">
            <span class="bar-label"> 
              <span class="star-tiny star-full"></span>{{data.rating}}
            </span>
            <span class="bar" v-bind:style="{width: `${data.rating/10*100}%`}"></span>
            <span class="bar-number"></span>
          </div>
        </div>
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
      data: {
        genres: [],
        rating: 0
      }
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
  padding: 15px;
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
.movies {
  border-top: 1px solid #CCCCCC;
  border-bottom: 1px solid #CCCCCC;
}
.score {
  display: flex;
  justify-content: center;
}
.score-container {
  flex: 1;
  padding: 20px;
  width: 160px;
  text-align: center;
}
.score-container .score {
  color: #333;
  font-size: 64px;
  font-weight: 100;
  line-height: 64px;
}
.rating-histogram {
  flex: 1;
  padding: 20px 20px 20px 30px;
  width: 170px;
}
.rating-box .bar-label .star-tiny {
  left: -2px;
  position: relative;
  top: -2px;
}
.rating-bar-container {
  width: 100%;
  height: 23px;
  position: relative;
}
.bar-label {
  font-size: 11px;
  left: -28px;
  letter-spacing: 1px;
  position: absolute;
  top: 4px;
}
.rating-bar-container .bar {
  background: #88b131;
  display: inline-block;
  height: 100%;
}
.bar-number {
  color: #333;
  font-size: 11px;
  left: 5px;
  position: absolute;
  top: 4px;
}
</style>
