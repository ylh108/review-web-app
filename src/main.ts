import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import Vant from "vant"
import "vant/lib/index.css"
import axios from "axios"
import '@/filters/index.ts'
import './mock/index.ts'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");