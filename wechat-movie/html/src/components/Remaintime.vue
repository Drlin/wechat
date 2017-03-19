<template>
  <span>{{t}}</span>
</template>

<script>
export default {
  data () {
    return {
      t: this.time
    }
  },
  created () {
    this.timer()
  },
  props: ['time'],
  methods: {
    timer () {
      if (this.t-- <= 1) {
        this.$emit('refreshState')
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
