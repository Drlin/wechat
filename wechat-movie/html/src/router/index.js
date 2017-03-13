import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Message from '@/components/Message'
import SignIn from '@/components/SignIn'

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
    }
  ]
})
