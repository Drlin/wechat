<template>
  <div class="search-form">
    <input maxlength="12" type="text" placeholder="输入小程序名称关键词" class="search-input">
    <div class="search-icon">
      <div><Icon type="search" /></div>
      <div><Icon type="angle-close" /></div>
    </div>
  </div>
</template>

<script>
import Icon from './common/Icon.vue'
export default {
  data () {
    return {

    }
  },
  created () {

  },
  components: {
    'Icon': Icon
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
  .search-icon >  div {
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
