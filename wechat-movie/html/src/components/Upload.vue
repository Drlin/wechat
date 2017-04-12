<template>
  <div class="upload">
    <h2>我的上传</h2>
    <ul v-if="lists.length > 0">
      <li v-for="item in lists">
        <img :src="`http://onw5789kx.bkt.clouddn.com/${item.icon}`" alt="">
        <p>{{item.name}}</p>
        <a href="">{{statusCode[item.status]}}</a>
      </li>
    </ul>
    <div class="error" v-else>
      <router-link to="/publish">
        还没有上传的小程序哦，去上传 
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Upload',
  data () {
    return {
      lists: [],
      statusCode: {
        0: '尚未审核',
        1: '审核通过',
        2: '审核不通过'
      }
    }
  },
  created () {
    this.$http.get(`/api/verify/userLists`)
    .then((res) => {
      console.log(res)
      let {data, status} = res.body
      if (status === 0) {
        this.lists = data
      }
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
    width: 100%;
    height: 4rem;
    text-align: center;
    font-size: 2rem;
    line-height: 4rem;
    background: #f8f8f8;
 }
 li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: .4rem .8rem;
  padding: .4rem .8rem;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
 }
 li > img {
    width: 5rem;
    height: 5rem;
 }
 li > a {
  color: #32af5a;
 }
 .error {
  text-align: center;
  margin-top: 3rem;
  font-size: 1.4rem;
 }
</style>
