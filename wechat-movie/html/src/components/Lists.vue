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
    <Spinner :isLoaded="isLoaded"/>
  </div>
</template>

<script>
import Content from './common/Content'
import Spinner from './common/Spinner.vue'
export default {
  data () {
    return {
      query: this.$route.query,
      lists: [],
      isLoaded: false
    }
  },
  components: {
    'v-content': Content,
    Spinner
  },
  mounted () {
    let catagoryName = this.query.key
    this.isLoaded = true
    this.$http.get(`/api/catagory/catagoryList?catagoryName=${catagoryName}`)
    .then((res) => {
      this.isLoaded = false
      let {data, status} = res.body
      if (status === 0) {
        let miniapp = data.miniapp
        if (catagoryName !== '排行榜' && catagoryName !== '推荐' && !miniapp.length === 0) {
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
