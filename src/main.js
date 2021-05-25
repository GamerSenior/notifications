import Vue from 'vue'
import App from './App.vue'
import { messaging, database } from './firebase'

Vue.config.productionTip = false

Vue.prototype.$messaging = messaging
Vue.prototype.$database = database

new Vue({
  render: h => h(App),
}).$mount('#app')