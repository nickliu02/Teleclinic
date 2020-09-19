import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router/index';
import axios from 'axios';
import { API_URL } from './config';
import AxiosPlugin from 'vue-axios-cors';


Vue.prototype.$axios = axios;
Vue.prototype.$API_URL = API_URL;
Vue.config.productionTip = false;
Vue.use(AxiosPlugin);

new Vue({
  vuetify, router,
  render: h => h(App)
}).$mount('#app')
