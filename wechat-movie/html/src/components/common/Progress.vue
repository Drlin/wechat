<template>
  <ul class="progress">
    <li v-for="(value, key) in rating">
      <span>{{[0, 5, 4, 3, 2, 1][key]}}</span>
      <div class="list-item">
        <div 
          class="inner" 
          :style="{width: total === 0 ? 0 : `${((value || 0)/total * 100)}%`}">
  
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['rating', 'total']
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .progress > li {
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
