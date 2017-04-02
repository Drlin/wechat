<template>
  <div class="collection">
    <h2>我的收藏</h2>
    <v-content
      :lists="lists"
    >
      <template scope="props" slot="link">
        <router-link :to="props.router">详情</router-link>
        <a href="javescript:void(0)">分享</a>
      </template>
    </v-content>
  </div>
</template>

<script>
import Content from './common/Content'
export default {
  name: 'Collection',
  data () {
    return {
      lists: []
    }
  },
  created () {
    this.$http.get(`/api/collection/userCollection`)
    .then((res) => {
      let {data, status} = res.body
      if (status === 0) {
        let arr = []
        data.map((item) => {
          arr.push(item.miniapp)
        })
        this.lists = arr
      }
    })
  },
  components: {
    'v-content': Content
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
</style>
