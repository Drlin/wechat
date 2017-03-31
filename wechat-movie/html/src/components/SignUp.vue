<template>
  <div class="signup">
    <div class="form-wrapper">
      <img class="logo-dom" src="../../static/time.jpg" alt="logo">
      <div class="signUp-wrapper">
        <input 
          class="text-input input" 
          maxlength="13" 
          placeholder="输入手机号" 
          v-model="user.phoneNum"
        >
        <input 
          class="text-input input" 
          type="password" 
          maxlength="13"
          placeholder="输入密码" 
          v-model="user.password"
        >
        <input 
          value="登录" 
          class="pass-button-full input" 
          type="button" 
          :disabled='!isDisabled'
          @click="submit"
        >
      </div>
    </div>
    <router-link to="signin" class="account-signin">立即注册</router-link>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import md5 from 'md5'
export default {
  name: 'SignUp',
  data () {
    return {
      user: {
        phoneNum: '',
        password: ''
      }
    }
  },
  computed: {
    isDisabled () {
      let {phoneNum, password} = this.user
      return phoneNum.length === 11 && password
    }
  },
  methods: {
    submit () {
      let password = md5(this.user.password)
      this.$http.post(`/api/user/signUp`, {...this.user, ...{password}})
      .then((res) => {
        let { status, token, msg } = res.data
        if (status === 0) {
          window.localStorage.setItem('token', token)
          Toast('登录成功')
          this.$router.push('/user')
        } else {
          Toast(msg)
        }
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
  .signUp-wrapper {
    width: 100%;
  }
  .input {
    margin: 1.5rem 0 0 0;
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
  .account-signin {
    position: absolute;
    color: #367cff;
    font-size: 1.6rem;
    border: 1px solid #367cff;
    border-radius: 0.2rem;
    padding: 1rem 2rem;
    left: 50%;
    transform: translateX(-50%);
    bottom: 5rem;
  }
</style>
