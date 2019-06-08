import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/router.js'

// In this example `win` is our instance
Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()

new Vue({
  store,
  router: router,
  render: h => h(App)
}).$mount('#app')
