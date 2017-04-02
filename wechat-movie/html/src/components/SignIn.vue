<template>
  <div class="form-wrapper">
    <img class="logo-dom" src="../../static/time.jpg" alt="logo">
    <div class="signIn-wrapper" v-if="!verifyed">
      <input 
        class="text-input input" 
        maxlength="6" 
        placeholder="输入用户名，最长6位" 
        v-model="user.name"
      >
      <input 
        class="text-input input" 
        maxlength="13" 
        placeholder="输入手机号" 
        type="number" 
        v-model="user.phoneNum"
      >
      <input 
        class="text-input input" 
        type="password" 
        maxlength="13"
        placeholder="输入6到16位密码" 
        v-model="user.password"
      >
      <input 
        value="注册" 
        class="pass-button-full input" 
        type="button" 
        :disabled='!isDisabled'
        @click="submit"
      >
    </div>
    <div class="vcode-wrapper" v-else>
      <p class="checkTip">已发送验证码短信到</p>
      <p class="checkPhone">{{user.phoneNum}}</p>
      <div class="form-input-vcode">
        <div class="form-input-wrapper">
          <label 
            class="text-label"
          >
            验证码
          </label>
          <input
            class="text-input-code" 
            v-model="verifyCode"
            placeholder="请输入验证码" 
            autocomplete="off" 
            maxlength="6" 
            type="number"
          >
          <span class="input-clearValue"></span>
        </div>
        <input 
          type="button" 
          value="获取验证码" 
          class="pass-button-vcode"
          @click="getVerify"
          v-if="timeOut"
        >
        <div class="pass-button-vcode" v-else>
          重新发送
          <Remaintime  
            :time="60" 
            @refreshState="refreshStateDone"
            >
          </Remaintime>
        </div>
      </div>
      <input 
        type="submit" 
        value="提交" 
        class="pass-button-full pass-button-submit"
        @click="register"
      >
    </div>
    <div class="account-signup">
      <router-link to="signup">已有账号？前去登录</router-link>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import { MessageBox, Toast } from 'mint-ui'
import Remaintime from './common/Remaintime'
export default {
  name: 'signIn',
  data () {
    return {
      user: {
        phoneNum: '',
        name: '',
        password: ''
      },
      verifyed: false,
      verifyCode: '',
      timeOut: true
    }
  },
  computed: {
    isDisabled () {
      let {phoneNum, name, password} = this.user
      return phoneNum.length === 11 && name && password
    }
  },
  components: {
    'Remaintime': Remaintime
  },
  methods: {
    validator () {
      let {password, phoneNum, name} = this.user
      let valid = true
      if (name.match(/[@#$%^&*<]+/g)) {
        Toast('用户名不能包含特殊字符')
        valid = false
      }
      if (!phoneNum.match(/^1[3|4|5|7|8]\d{9}$/ig)) {
        Toast('请输入正确的手机号')
        valid = false
      }
      if (!password.match(/^\w{6,16}$/ig)) {
        Toast('密码需6到16位数字或字母')
        valid = false
      }
      return valid
    },
    submit () {
      if (!this.validator()) {
        return
      }
      this.$http.post(`/api/user/signIn`, {...this.user, ...{password: md5(this.user.password)}})
      .then((res) => {
        let { status } = res.data
        if (status === 0) {
          this.verifyed = true
        } else if (status === 1) {
          MessageBox({
            title: '提示',
            message: '您已经注册账号，是否去登录',
            showCancelButton: true
          })
          .then(action => {
            if (action === 'confirm') {
              this.$router.push('/signup')
            }
          })
        }
      })
    },
    getVerify () {
      let {phoneNum} = this.user
      this.timeOut = false
      this.$http.post(`/api/user/getVerify`, {phoneNum})
      .then((res) => {
        let { status } = res.data
        if (status === 0) {
          console.log('1')
        }
      })
    },
    register () {
      let {phoneNum} = this.user
      this.$http.post(`/api/user/validate`, {phoneNum, verifyCode: this.verifyCode})
      .then((res) => {
        let { status } = res.data
        if (status === 0) {
          Toast('注册成功')
          this.$router.push('/signup')
        } else {
          Toast('验证码错误')
        }
      })
    },
    refreshStateDone () {
      this.timeOut = true
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
  .signIn-wrapper {
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
  .vcode-wrapper {
    width: 100%;
  }
  .checkTip {
    width: 100%;
    text-align: center;
    padding-top: 20px;
    font-size: 15px;
    line-height: 25px;
    color: #979797;
  }
  .checkPhone {
    width: 100%;
    font-size: 26px;
    text-align: center;
    line-height: 35px;
    padding-bottom: 10px;
  }
  .form-input-vcode {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .form-input-wrapper {
    display: flex;
    align-items: center;
    flex: 0 0 61%;
    flex-direction: row;
    height: 5rem;
    padding: 0 1rem;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
  .text-label {
    flex: 0 0 5.5rem;
    font-size: 1.6rem;
  }
  .text-input-code {
    flex: 1;
    align-self: center;
    border: 0;
    font-size: 1.6rem;
    color: #333;
    overflow: hidden;
    outline: none;
  }
  .pass-button-vcode {
    flex: 0 0 26%;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 5rem;
    background: #fff;
    font-size: 1.4rem;
    border: 1px solid #ccc;
  }
  .pass-button-vcode > span {
    align-self: center;
    align-content: center;
  }
  .pass-button-submit {
    height: 4.4rem;
    outline: none;
  }
  .account-signup {
    padding-top: 1rem;
    width: 100%;
    text-align: right;
    font-size: 1.4rem;
  }
</style>
