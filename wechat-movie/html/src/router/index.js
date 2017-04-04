import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import signUp from '@/components/SignUp'
import User from '@/components/User'
import Detail from '@/components/Detail'
import Search from '@/components/Search'
import Collection from '@/components/Collection'
import Category from '@/components/Category'
import Lists from '@/components/Lists'
import Publish from '@/components/Publish'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    },
    {
      path: '/app/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/collection',
      name: 'collection',
      component: Collection
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    },
    {
      path: '/lists',
      name: 'lists',
      component: Lists
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    }
  ]
})
