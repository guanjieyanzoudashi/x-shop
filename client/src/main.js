// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'
import { currency } from './util/currency'
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/product.css'
Vue.use(VueAxios, Axios)

Vue.use(VueInfiniteScroll)
Vue.filter('currency', currency)
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.checkLogin()
    this.getCatCount()
  },
  methods: {
    checkLogin () {
      this.$http.get('/users/checkLogin')
      .then(res => {
        res = res.data
        if (res.status === 0) {
          this.$route.commit('updateuserInfo', res.result)
        } else {
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        }
      })
    },
    getCatCount () {
      this.$http.get('/users/getCartCount')
      .then(res => {
        res = res.data
        if (res.status === 0) {
          this.$store.commit('updateCartCount', res.result)
        }
      })
    }
  }
})
