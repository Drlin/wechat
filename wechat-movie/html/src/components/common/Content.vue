<template>
  <ul
    class="item-wrap page-infinite-list">
	  <li v-for="item in lists" class="item">
      <router-link :to="`/app/${item._id}`">
        <img class="item-img" :src="item.icon" />
        <div class="item-info-left">
          <h2>{{ item.name }}</h2>
          <p>分类: &nbsp;{{ item.catagory.name }}</p>
          <Star :rating="item.overall_rating || 0" />
        </div>
        <div class="qrcode">
          详情
        </div>
      </router-link>
    </li>
	</ul>
</template>

<script>
  import Star from './Star'
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
    props: ['lists'],
    components: {
      'Star': Star
    }
  }
</script>

<style>
.item-wrap {
  width: 100%;
}
  
.item-wrap .item {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #F1F1F1;
}
.item a {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0.8rem;
  align-items: center;
}      
.item-img {
  width: 5rem;
  height: 5rem;
  flex: 0 0 5rem; 
}
.item-info-left {
  flex: 1;
  margin-left: 0.8rem;
  color: #7D8994;
}
.item-info-left h2 {
  color: #3D464D;
  font-size: 1.4rem;
}       
.item-info-left p {
  margin: 0.1rem 0;
  font-size: 1.2rem;
  max-height: 2em;
  text-overflow: ellipsis;
  overflow: hidden;
}   
.qrcode {
  flex: 0 0 3.8rem;
  width: 3.8rem;
  height: 2.2rem;
  text-align: center;
  line-height: 2rem;
  border-radius: .2rem;
  background: #fff;
  border: .1rem solid rgba(0,0,0,.1);
  font-size: 1.2rem;
  color: #47525d;
}
.page-infinite-loading {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
 
</style>
