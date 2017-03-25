import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Message from '@/components/Message'
import SignIn from '@/components/SignIn'
import signUp from '@/components/SignUp'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/message',
      name: 'message',
      component: Message
    },
    {
      path: '/signin',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signUp',
      component: signUp
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
