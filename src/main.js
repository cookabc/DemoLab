import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import http from './plugins/axios'
import ElementUI from 'element-ui'
import './assets/element-variables.scss'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small',
})
Vue.prototype.$http = http

window.vue = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
