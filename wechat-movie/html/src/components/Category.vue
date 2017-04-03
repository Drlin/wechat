<template>
  <div class="category">
    <h2>类别</h2>
    <div class="container">
      <router-link  v-for="item in lists" to="/app" key="item.key">
        <span :style="{color: item.color}"><Icon :type="item.type"/></span>
        <p>{{item.value}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import Icon from './common/Icon'
export default {
  data () {
    return {
      lists: [
        {
          type: 'stack',
          key: '',
          value: '全部',
          color: '#303030'
        }, {
          type: 'music',
          key: '在线音乐',
          value: '音乐',
          color: '#F31176'
        }, {
          type: 'airplane',
          key: '航班',
          value: '航班',
          color: '#2776B3'
        }, {
          type: 'cart',
          key: '商城',
          value: '购物',
          color: '#DD0000'
        }, {
          type: 'play',
          key: '在线视频',
          value: '视频',
          color: '#19BF97'
        }, {
          type: 'image',
          key: '摄影',
          value: '摄影',
          color: '#F8B500'
        }, {
          type: 'glass',
          key: '美食',
          value: '美食',
          color: '#913107'
        }, {
          type: 'lifebuoy',
          key: '旅行',
          value: '旅行',
          color: '#20A7E5'
        }
      ]
    }
  },
  components: {
    'Icon': Icon
  },
  created () {
    this.$http.get(`/api/catagory/catagorys`)
    .then((res) => {
      let {data, status} = res.body
      if (status === 0) {
        data.map((item) => {
          console.log(item.name)
        })
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
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.container > a {
  flex: 0 0 33.3333%;
  padding: 2.2rem 0 2.2rem 0;
  text-align: center;
  align-self: center;
  font-size: 1.8rem;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.container > a > span {
  font-size: 2.6rem;
}
.container > a > p {
  font-size: 1.4rem;
  line-height: 2rem;
}
</style>
