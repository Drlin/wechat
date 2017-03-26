<template>
  <mt-loadmore 
      :top-method="loadTop"
      :bottom-method="loadBottom" 
      :bottom-all-loaded="allLoaded"
      :topMethod="loadMoreData"
      ref="loadmore"
      >
    <ul
      class="item-wrap page-infinite-list">
  	  <li v-for="item in lists" class="item">
        <router-link :to="{ name: 'detail', params: { productId: item.productId }}">
          <img class="item-img" width="64px" height="64px" :src="item.logoImgUrl" />
          <div class="item-info-left">
            <h2>{{ item.name }}</h2>
            <p>{{ item.slogan }}</p>
          </div>
          <div class="qrcode">
            <img width="100%" height="100%" :src="item.qrImgUrl" @click="showModel(item.qrImgUrl)" />
          </div>
        </router-link>
      </li>
  	</ul>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <img :src="qrcodeUrl">
    </mt-popup>
  </mt-loadmore>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        loading: false,
        IsLoading: 10,
        len: 0,
        popupVisible: false,
        qrcodeUrl: ''
      }
    },
    props: ['lists', 'picIndex', 'allLoaded'],
    methods: {
      showModel (qrcodeUrl) {
        this.qrcodeUrl = qrcodeUrl
        this.popupVisible = true
      },
      loadBottom (id) {
        this.$emit('onPage')
        this.$refs.loadmore.onBottomLoaded()
      },
      loadTop () {
        this.$emit('onPageTop')
        this.$refs.loadmore.onTopLoaded()
      }
    },
    computed: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.item-wrap
  width: 100%;
  .item 
    position: relative;
    width: 100%;
    border-bottom: 1px solid #F1F1F1;
    a
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
      .item-img 
        flex: 0 0 64px;
      .item-info-left
        flex: 1;
        margin-left: 10px;
        color: #7D8994;
        h2 
          color: #3D464D;
          font-size: 16px;
        p
          margin-top: 5px;
          font-size: 14px;
          max-height: 2em;
          text-overflow: ellipsis;
          overflow: hidden;
      .qrcode
        flex: 0 0 34px;
        width: 34px;
        height: 34px;
.page-infinite-loading
  text-align: center;
  height: 50px;
  line-height: 50px;
</style>
