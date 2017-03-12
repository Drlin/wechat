<template>
  <div class="message">
    <div class="list-group messages" auto-scroll-to-bottom>
      <div class="list-group-item" v-for="item in messages">
        某某: {{item}}
      </div>
      <input v-model="message" placeholder="edit me"/>
      <button >发送</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      messages: [],
      message: ''
    }
  },
  created () {

  },
  sockets: {
    connected () {
      console.log('socket connected')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
