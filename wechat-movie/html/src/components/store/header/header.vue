<template>
  <div class="header">
    <div class="menu">
      <ul class="menu-content">
        <li class="menu-item" 
            v-for="item in bars" 
            :class="{active: $route.query.key === item.id}"
            @click="chooseBar(item.id)"
        >
          <a>{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {

      }
    },
    props: ['bars'],
    created () {
      console.log(this.bars)
    },
    methods: {
      chooseBar: function (id) {
        this.$parent.changeKey(id)
      }
    },
    computed: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.header
  display: block;
  overflow-y: hidden;
  position: relative;
  webkit-overflow-scrolling: touch;
  height: 41px;
  .menu 
    display: inline-block;
    width: 100%;
    position: relative;
    white-space: nowrap;
    overflow-x: scroll;
    background-color: #f8f8f8;
    .menu-content
      height: 41px;
      li.menu-item
        display: inline-block;
        line-height: 40px;
        height: 40px;
        margin: 0;
        padding: 0px 16px;
        text-align: center;
        &.active 
          border-bottom: 1px solid #4285f4;
          a
            color: #4285f4;
        a
          display: inline-block;
          color: rgba(0,0,0,0.54);
</style>
