<template>
  <div>
     <div class="store-header">
       <v-header :bars="bars" :changeKey="changeKey"></v-header>
    </div>
    <div class="store-content">
      <v-content :lists="lists"
                 :allLoaded="allLoaded"
                 v-on:onPageTop="onPageTop"
                 v-on:onPage="onPageChange"></v-content>
    </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Header from './header/header'
  import Content from './content/Content'
  export default {
    components: {
      'v-header': Header,
      'v-content': Content
    },
    data () {
      return {
        bars: [],
        lists: [],
        total: '',
        page: 1,
        key: '',
        allLoaded: false
      }
    },
    created () {
      this.$http.get('/category/getList').then((res) => {
        res = JSON.parse(res.body)
        // res = res.body
        if (res.statusCode === 0) {
          this.bars = [{name: '全部', id: ''}, ...res.data.list]
        }
      })
      this.getListData()
    },
    methods: {
      getListData () {
        let key = this.$route.query.key || ''
        this.$http.get(`/product/getList?pageNo=${this.page}&category=${key}`).then((res) => {
          res = JSON.parse(res.body)
          // res = res.body
          if (res.statusCode === 0) {
            let data = res.data
            let listData = data.list
            listData.length === 0 && (this.allLoaded = true)
            this.lists = [...this.lists, ...listData]
          }
        })
      },
      onPageChange () {
        this.page++
        this.getListData()
      },
      changeKey (key) {
        this.$router.push({query: { key }})
        this.page = 1
        this.lists = []
        this.key = key
        this.getListData()
      },
      onPageTop () {
        this.page = 1
        this.lists = []
        this.getListData()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.store-header 
  position: fixed;
  top: 0;
  z-index: 4;
  width: 100%;
.store-content
  position: absolute;
  width: 100%;
  top: 50px;
</style>
