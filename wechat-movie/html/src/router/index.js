import Vue from 'vue'
import Router from 'vue-router'
const Home = resolve => require(['@/components/Home.vue'], resolve)
const SignIn = resolve => require(['@/components/SignIn.vue'], resolve)
const signUp = resolve => require(['@/components/SignUp.vue'], resolve)
const User = resolve => require(['@/components/User.vue'], resolve)
const Detail = resolve => require(['@/components/Detail.vue'], resolve)
const Search = resolve => require(['@/components/Search.vue'], resolve)
const Collection = resolve => require(['@/components/Collection.vue'], resolve)
const Category = resolve => require(['@/components/Category.vue'], resolve)
const Lists = resolve => require(['@/components/Lists.vue'], resolve)
const Publish = resolve => require(['@/components/Publish.vue'], resolve)
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
