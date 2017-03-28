<template>
  <ul class="progress">
    <div v-for="(item, i) in evenRating">
      <span>{{[5, 4, 3, 2, 1][i]}}</span>
      <li class="list-item">
        <div class="inner" :style="{width: `${((item || 0)/total * 100)}%`}"></div>
      </li>
    </div>
  </ul>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['rating', 'total'],
  computed: {
    evenRating () {
      this.rating.splice(0, 1)
      return this.rating.sort()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .progress > div {
    display: flex;
  }
  .progress .list-item {
    display: inline-block;
    width: 12rem;
    height: .8rem;
    margin: 0.2rem 0 0 0.3rem;
    position: relative;
    background: #eee;
    overflow: hidden;
    border-radius: 1rem;
  }
  .progress .list-item > .inner {
    background-image: linear-gradient(90deg,#84c909 0,#40be0d 100%);
    width: 100%;
    height: 100%;
  }

  
</style>
