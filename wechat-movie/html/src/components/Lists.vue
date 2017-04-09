<template>
  <div class="lists">
    <h2>{{query.value}}</h2>
    <v-content
      :lists="lists"
    >
      <template scope="props" slot="link">
        <router-link :to="props.router">详情</router-link>
      </template>
    </v-content>
  </div>
</template>

<script>
import Content from './common/Content'
export default {
  data () {
    return {
      query: this.$route.query,
      lists: []
    }
  },
  components: {
    'v-content': Content
  },
  created () {
    let catagoryName = this.query.key
    this.$http.get(`/api/catagory/catagoryList?catagoryName=${catagoryName}`)
    .then((res) => {
      let {data, status} = res.body
      if (status === 0) {
        let miniapp = data.miniapp
        if (catagoryName !== '排行榜' || catagoryName !== '推荐') {
          miniapp.map((item) => {
            item.catagory = {}
            item.catagory.name = this.query.key
          })
        }
        this.lists = miniapp
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
    font-size: 1.6rem;
    line-height: 4rem;
    background: #f8f8f8;
  } 
</style>
