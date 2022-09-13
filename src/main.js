import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store/index'
import vuetify from './plugins/vuetify'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from 'axios'

require('@/store/subscriber')

axios.defaults.baseURL = 'http://localhost:3000/';

Vue.use(Toast);

Vue.config.productionTip = false

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    vuetify,
    router,
    render: h => h(App), store
  }).$mount('#app')
})


