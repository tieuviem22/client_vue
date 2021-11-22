import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import router from './router';

import 'ant-design-vue/dist/antd.css';
import store from './store/index';
import './assets/mixin';
// import JwtService from './store/jwt.service';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.use(Antd);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

