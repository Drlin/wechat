<template>
  <div class="search">
    <div class="search-form">
      <input maxlength="12" 
              type="text" 
              placeholder="输入小程序名称关键词" 
              class="search-input"
              v-model="search"
            >
      <div class="search-icon">
        <div @click="searchSubmit"><Icon type="search" /></div>
        <div>
          <Icon type="angle-close" />
        </div>
      </div>
    </div>
    <v-content
      :lists="lists"
      :allLoaded="allLoaded"
      v-on:onPageTop="onPageTop"
      v-on:onPage="onPageChange"
    >
    </v-content>
  </div>
</template>



<script>
import Icon from './common/Icon.vue'
import { Toast } from 'mint-ui'
import Content from './common/Content'
export default {
  data () {
    return {
      search: '',
      lists: '',
      allLoaded: false
    }
  },
  created () {

  },
  components: {
    'Icon': Icon,
    'v-content': Content
  },
  methods: {
    searchSubmit () {
      if (!this.search) {
        Toast('请输入查询条件')
      }
      this.$http.post('/api/miniapp/search', {query: this.search.trim()})
      .then((res) => {
        let {status, data} = res.body
        if (status === 0) {
          this.lists = data
        }
      })
    },
    onPageChange () {
    },
    onPageTop () {
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .search-form {
    display: flex;
    justify-content: space-between;
    border-bottom: .1rem solid #f1f1f1;
  }
  .search-input {
    flex: 1;
    text-indent: 1rem;
    font-size: 1.4rem;
  }
  .search-icon {
    display: flex;
  }
  .search-icon > div {
    display: flex;
    color: #7d8994;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    line-height: 3rem;
    border-left: .1rem solid #f1f1f1;
  }
  .search-icon >  div {
    font-size: 1.4rem;
  }
</style>
