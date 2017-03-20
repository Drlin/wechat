// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import 'mint-ui/lib/style.css'
import App from './App'
import router from './router'
import VueSocketio from 'vue-socket.io'

Vue.use(VueSocketio, 'http://localhost:3000')

Vue.use(VueResource)
Vue.config.productionTip = false
try {
  let token = window.localStorage.getItem('token')
  console.log(token)
  Vue.http.headers.common['Authorization'] = `Bearer ${token}`
} catch (e) {
  console.log(e)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
