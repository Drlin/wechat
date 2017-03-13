<template>
  <div class="form-wrapper">
    <img class="logo-dom" src="../../static/time.jpg" alt="logo">
    <input class="text-input input" maxlength="13" placeholder="输入手机号" v-model="phoneNum">
    <input 
      value="获取手机验证码" 
      class="pass-button-full input" 
      type="button" 
      :disabled='isDisabled'
      @click="submit"
    >
  </div>
</template>

<script>
export default {
  name: 'signIn',
  data () {
    return {
      phoneNum: ''
    }
  },
  computed: {
    isDisabled () {
      return this.phoneNum.length !== 11
    }
  },
  methods: {
    submit () {
      this.$http.post(`/api/user/verify`, {
        phoneNum: this.phoneNum
      }).then((res) => {
        this.data = res.body
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px;
    overflow: hidden;
  }
  .logo-dom {
    margin-top: 35px;
    width: 138px;
  }
  .input {
    margin: 2.5rem 0 0 0;
    width: 100%;
    line-height: 4.4rem;
    height: 4.4rem;
    border-radius: 2px;
    box-sizing: border-box;
  }
  .text-input {
    padding-left: 1rem;
    font-size: 1.6rem;
    border: 1px solid #d6d6d6;
    outline: none;
  }
  .pass-button-full {
    color: #fff;
    font-size: 1.8rem;
    width: 100%;
    border-radius: 2px;
    border: 1px solid #3c76ff;
    background: #3c76ff;
    margin: 2.5rem 0 0 0;
  }
  .pass-button-full:disabled {
    color: #90b6ff;
  }
</style>
