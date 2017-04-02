<template>
  <div class="search">
    <div class="search-form">
      <input 
        maxlength="12" 
        type="text" 
        placeholder="输入小程序名称关键词" 
        class="search-input"
        v-model="search"
        @click="hideHotLists"
      />
      <div class="search-icon">
        <div class="search_icon_search" @click="searchSubmit"><Icon type="search" /></div>
        <router-link to="/" class="search_icon_close">
          <Icon type="angle-close" />
        </router-link>
      </div>
    </div>
    <div class="hot-search" v-if="hotListsShow">
      <div class="inner">
        <h2>热门搜索</h2>
        <p v-for="item in hotLists">
          {{item.name}}
        </p>
      </div>
    </div>
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
import Icon from './common/Icon.vue'
import { Toast } from 'mint-ui'
import Content from './common/Content'
export default {
  data () {
    return {
      search: '',
      lists: '',
      allLoaded: false,
      hotLists: [],
      hotListsShow: true
    }
  },
  created () {
    this.$http.get('/api/miniapp/hotLists')
    .then((res) => {
      let {status, data} = res.body
      if (status === 0) {
        this.hotLists = data
      }
    })
  },
  components: {
    'Icon': Icon,
    'v-content': Content
  },
  methods: {
    hideHotLists () {
      this.hotListsShow = false
    },
    searchSubmit () {
      if (!this.search) {
        Toast('请输入查询条件')
      }
      this.$http.post('/api/miniapp/search', {query: this.search.trim()})
      .then((res) => {
        let {status, data} = res.body
        if (status === 0) {
          data.length === 0 && Toast('没有搜索结果，换个词试试')
          this.lists = data
        }
      })
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
  .search_icon_close, .search_icon_search {
    display: flex;
    color: #7d8994;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    line-height: 3rem;
    border-left: .1rem solid #f1f1f1;
  }
  .search-icon > div {
    font-size: 1.4rem;
  }
  .hot-search {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .hot-search .inner > h2 {
    text-align: center;
    margin-bottom: .3rem;
    font-size: 1.6rem;
    color: #000000;
  }
  .hot-search .inner > p {
    font-size: 1.4rem;
    padding: .2rem 0;
    text-align: center;
    color: #0db252;
  }
    
</style>
