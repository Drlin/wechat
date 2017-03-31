// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'

Vue.use(VueResource)
Vue.config.productionTip = false

try {
  let token = window.localStorage.getItem('token')
  Vue.http.headers.common['Authorization'] = `Bearer ${token}`
} catch (e) {
  console.log(e)
}

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401 && !request.url.match('/api/collection/collectionList')) {
      router.push('/signup')
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
