import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Message from '@/components/Message'
import SignIn from '@/components/SignIn'
import signUp from '@/components/SignUp'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
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
