<template>
  <span>{{t | time}}</span>
</template>

<script>
export default {
  data () {
    return {
      t: this.time
    }
  },
  ready () {
    this.timer()
  },
  props: ['time', 'index'],
  methods: {
    timer () {
      if (this.t-- <= 1) {
        this.$dispatch('refreshState', this.index)
        return
      }
      setTimeout(() => this.timer(), 999)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>