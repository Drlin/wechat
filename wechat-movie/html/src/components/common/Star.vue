<template>
  <div class="star">
    <div class="star-inner" :style="{width: `${rating/5 * 100}%`}"> 
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['rating']
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .star {
    width: 6rem;
    height: 1rem;
    background: url(/static/score-n.png) no-repeat left center;
    background-size: cover;
  }    
  .star-inner {
    height: 100%;
    background: url(/static/score-p.png) no-repeat left center;
    background-size: 6rem 1rem;
  } 
</style>
