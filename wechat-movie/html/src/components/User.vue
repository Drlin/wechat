<template>
  <div class="user">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
    }
  },
  created () {
    this.$http.get(`/api/UserCenter`).then((res) => {
      this.data = res.body
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
