// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'

import './filter'

Vue.use(VueResource)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  try {
    let token = window.localStorage.getItem('token')
    Vue.http.headers.common['Authorization'] = `Bearer ${token}`
  } catch (e) {
    console.log(e)
  }
  next()
})

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    let path = router.history.current.fullPath
    if (response.status === 401 && !request.url.match('/api/collection/collectionList')) {
      router.push(`/signup?path=${path}`)
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
