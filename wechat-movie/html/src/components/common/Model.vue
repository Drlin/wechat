<template>
  <div class="model" v-if="vis" @click.stop="close">
    <mt-swipe :auto="0" :defaultIndex="picIndex">
      <mt-swipe-item v-for="item in pics" :key="item.imgUrl">
        <img :src="item" width="90%" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="vue-modal"></div>
  </div>
</template>

<script>
  import { Swipe, SwipeItem } from 'mint-ui'
  export default {
    data () {
      return {
        swiperOption: {}
      }
    },
    components: {
      'mt-swipe': Swipe,
      'mt-swipe-item': SwipeItem
    },
    props: ['pics', 'vis', 'picIndex'],
    methods: {
      close () {
        this.$emit('closeModel')
      }
    }
  }
</script>

<style>
.mint-swipe {
  position: fixed;
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  z-index: 21;
  display: block;
}
 
.mint-swipe-item > img {
  position: absolute;
  left: 5%;
}
.vue-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 20;
}
  
.mint-swipe-indicator {
  background: #fff;
}
.mint-swipe-indicator.is-active {
  background: red;
}
</style>
