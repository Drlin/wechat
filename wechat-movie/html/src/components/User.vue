<template>
  <div class="user-profile">
    <div class="user-img">
      <img class="user-img-pic" :src="user.portrait" width="100%" height="100%" alt="头像">
    </div>
    <div class="user-name">{{user.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.$http.get(`/api/UserCenter`).then((res) => {
      let {status, data} = res.body
      if (status === 0) {
        this.user = data
      }
    })
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .user-profile {
    background-image: linear-gradient(top,#388EFF,#409FFD);
    display: flex;
    padding: 17px 16px;
  }
  .user-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #fff;
    margin-right: 17px;
  }
  .user-img-pic {
    border-radius: 50%;
  }
  .user-name {
    color: #fff;
    font-size: 18px;
    margin-top: 11px;
    max-width: 220px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
